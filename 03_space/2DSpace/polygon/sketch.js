/*
Mimi Yin NYU-ITP
Mapping mouse position inside polygon.
 */

var polygon = new Polygon();

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}


function draw() {
  background(0);

  // Draw polygon
  // Is the mouse inside the shape?
  var mouse = createVector(mouseX, mouseY);

  if (polygon.isReady()) {
    // Is mouse inside the polygon?
    var isInside = polygon.contains(mouse);

    // If mouse inside the polygon, paint polygon red!
    if (isInside) fill(255, 0, 0);
    else fill(255, 128);
    noStroke();
    polygon.display();

    // Calculate distance to nearest point on side
    var np = polygon.getNearestPointOnSide(mouse);
    // Draw a line from mouse to closest point on this side
    stroke(255);
    strokeWeight(1);
    line(mouse.x, mouse.y, np.x, np.y);

    // Calculate distance to nearest point on nearest side
    var d = p5.Vector.sub(mouse, np).mag();

    // Get 2 vectors that define nearest side
    // Map distance to side to strokeWeight of side
    var ns = polygon.getNearestSide(mouse);
    stroke(255);
    strokeWeight(100 - d);
    strokeCap(SQUARE); // Don't add rounded ends to line.
    line(ns.start.x, ns.start.y, ns.end.x, ns.end.y);

    // Calculate distance to nearest vertex
    var nv = polygon.getNearestVertex(mouse);
    // Draw a line from mouse to closest point on this side
    // Scale the stroke of the line to the nearest side by the distance
    var d = p5.Vector.sub(mouse, nv).mag();
    stroke(255);
    strokeWeight(1);
    line(mouse.x, mouse.y, nv.x, nv.y);
    noStroke();
    fill(255);
    ellipse(nv.x, nv.y, d, d);
  }
}

function mousePressed() {
  polygon.addVertex(mouseX, mouseY);
}