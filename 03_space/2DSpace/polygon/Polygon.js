var Polygon = function() {
  var vertices = [];

  //Re-implementation of this: http:/ / stackoverflow.com / a / 218081
  var areIntersecting = function (p0, p1, s0, s1) {
    var d1, d2;
    var a1, a2, b1, b2, c1, c2;

    // Convert the s0-s1 vector to a line of infinite length.
    // We want the line in linear equation standard form: A*x + B*y + C = 0
    // See: http://en.wikipedia.org/wiki/Linear_equation
    a1 = s1.y - s0.y; // change in y
    b1 = s0.x - s1.x; // change in x
    c1 = (s1.x * s0.y) - (s0.x * s1.y);

    // Every point (x,y), that solves the equation above, is on the line,
    // every point that does not solve it, is not. The equation will have a
    // positive result if it is on one side of the line and a negative one
    // if is on the other side of it. We insert (x1,y1) and (x2,y2) of vector
    // 2 into the equation above.
    d1 = (a1 * p0.x) + (b1 * p0.y) + c1;
    d2 = (a1 * p1.x) + (b1 * p1.y) + c1;

    // If d1 and d2 both have the same sign, they are both on the same side
    // of our line 1 and in that case no intersection is possible. Careful,
    // 0 is a special case, that's why we don't test ">=" and "<=",
    // but "<" and ">".
    if (d1 > 0 && d2 > 0) return false;
    if (d1 < 0 && d2 < 0) return false;

    // The fact that vector 2 intersected the infinite line 1 above doesn't
    // mean it also intersects the vector 1. Vector 1 is only a subset of that
    // infinite line 1, so it may have intersected that line before the vector
    // started or after it ended. To know for sure, we have to repeat the
    // the same test the other way round. We start by calculating the
    // infinite line 2 in linear equation standard form.
    a2 = p1.y - p0.y;
    b2 = p0.x - p1.x;
    c2 = (p1.x * p0.y) - (p0.x * p1.y);

    // Calculate d1 and d2 again, this time using points of vector 1.
    d1 = (a2 * s0.x) + (b2 * s0.y) + c2;
    d2 = (a2 * s1.x) + (b2 * s1.y) + c2;

    // Again, if both have the same sign (and neither one is 0),
    // no intersection is possible.
    if (d1 > 0 && d2 > 0) return false;
    if (d1 < 0 && d2 < 0) return false;

    // If we get here, only two possibilities are left. Either the two
    // vectors intersect in exactly one point or they are collinear, which
    // means they intersect in any number of points from zero to infinite.
    if ((a1 * b2) - (a2 * b1) == 0.0) return true;

    // If they are not collinear, they must intersect in exactly one point.
    return true;
  }

  // From Dan Shiffman
  // A function to get the normal point from a point (p) to a line segment (a-b)
  // This function could be optimized to make fewer new Vector objects
  var getNormalPoint = function (p, s0, s1) {
    // Vector from start of the side to p
    s0p = p5.Vector.sub(p, s0);
    // Vector from start of side to end of side
    s0s1 = p5.Vector.sub(s1, s0);
    s0s1.normalize(); // Normalize the line
    // Project vector "diff" onto line by using the dot product
    s0s1.mult(s0p.dot(s0s1));
    var normalPoint = p5.Vector.add(s0, s0s1);
    return normalPoint;
  }

  // Draw polygon
  this.display = function () {
    beginShape();
    for (var v = 0; v < vertices.length; v++) {
      var vert = vertices[v];
      vertex(vert.x, vert.y);
    }
    endShape(CLOSE);
  }

  // Is this a polygon?
  this.isReady = function() {
    return vertices.length > 0;
  }

  // Add vertex
  this.addVertex = function(x, y) {
    vertices.push(createVector(x, y));
  }

  // Add array of vertices of vector objects
  this.addVertices = function(_vertices) {
    vertices = _vertices;
  }

  // Clears vertices
  this.clear = function() {
    vertices = [];
  }

  // Calculate whether point is inside polygon
  this.contains = function(point) {
    // Is the body inside the shape?
    var intersections = 0;

    // Test whether it is inside or outside polygon
    // Calculate distance to nearest side

    stroke(128);
    for (var v = 0; v < vertices.length; v++) {
      var v1 = vertices[v];
      var v2 = v == vertices.length - 1 ? vertices[0] : vertices[v + 1];

      // v1 and v2 are the start and end points of this side of the polygon
      // Test to see if the mouse intersects the side
      if (areIntersecting(createVector(0, 0), point, v1, v2)) intersections++;
    }

    return intersections%2 == 1;
  }

  // Get nearest side
  this.getNearestSide = function (point) {
    var nearestSide = {};
    var dist2Side = width * height;

    for (var v = 0; v < vertices.length; v++) {
      var v1 = vertices[v];
      var v2 = v == vertices.length - 1 ? vertices[0] : vertices[v + 1];

      // Get point closest to mouse on this side
      var n = getNormalPoint(point, v1, v2);
      // Calculate distance to side
      var d = p5.Vector.sub(n, point).mag();
      // Is this the closest side?
      if (d < dist2Side) {
        dist2Side = floor(d);
        nearestSide = { start: v1, end: v2};
      }
    }
    return nearestSide;
  }

  // Get nearest point on nearest side
  this.getNearestPointOnSide = function (point) {
    var nearestPointOnSide = createVector();
    var dist2Side = width * height;

    for (var v = 0; v < vertices.length; v++) {
      var v1 = vertices[v];
      var v2 = v == vertices.length - 1 ? vertices[0] : vertices[v + 1];

      // Get point closest to mouse on this side
      var n = getNormalPoint(point, v1, v2);
      // Calculate distance to side
      var d = p5.Vector.sub(n, point).mag();
      // Is this the closest side?
      if (d < dist2Side) {
        dist2Side = floor(d);
        nearestPointOnSide = n;
      }
    }
    return nearestPointOnSide;
  }

  // Get nearest vertex
  this.getNearestVertex = function (point) {
    var nearestVertex = createVector();
    var dist2Vertex = width * height;

    for (var v = 0; v < vertices.length; v++) {

      // Get point closest to mouse on this side
      var vertex = vertices[v];
      // Calculate distance to vertex
      var d = p5.Vector.sub(vertex, point).mag();
      // Is this the closest vertex?
      if (d < dist2Vertex) {
        dist2Vertex = floor(d);
        nearestVertex = vertex;
      }
    }
    return nearestVertex;
  }
}