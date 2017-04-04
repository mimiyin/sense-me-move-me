/*
Mimi Yin NYU-ITP
Mapping Kinect Skeleton locations to floor projection.
 */

// Declare kinectron
var kinectron = null;

// Mapping Kinect data to projecion
var xscl, yscl;
var xshift, yshift;
var scl = true;

// Managing kinect bodies
var bm = new BodyManager();
var DEATH_TH = 1000;

var diag; // Diagonal of screen

var polygon = new Polygon();

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.16.231.112");
  //kinectron = new Kinectron("192.168.0.118");


  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  xscl = (width/3.2)*0.55;
  yscl = -(width/3.2)*0.6;
  xshift = 0;
  yshift = height / 2;

  // Calculate maximum distance to normalize data
  diag = sqrt(sq(width) + sq(height));

  background(0);
}

function draw() {
  background(0);

  // Get array of bodies
  var bodies = bm.getBodies();
  // Variable to keep track of the it body's location
  var it;

  // Clear the polygon
  polygon.clear();

  for (var b = 0; b < bodies.length; b++) {

    // Get body
    var body = bodies[b];

    // Get position of body
    var pos = getPos(body.getPosition(kinectron.HEAD));

    // 1st body is IT!
    if (bodies.length > 0 && b == 0) it = pos;
    // Add all other bodies to polygon
    else polygon.addVertex(pos.x, pos.y);
  }

  // Draw the polygon
  noStroke();
  fill(255, 128);
  polygon.display();

  // Skip the rest if there is no it.
  if (it != null && polygon.isReady()) {

    // Is "it" inside the polygon?
    var itIsInside = polygon.contains(it);

    // If it is inside the polygon, paint it red!
    if (itIsInside) {
      noStroke();
      fill(255, 0, 0);
      polygon.display();
    }

    // Get nearest point on side to IT
    var np = polygon.getNearestPointOnSide(it);
    // Draw a line from mouse to closest point on this side
    stroke(255);
    strokeWeight(1);
    line(it.x, it.y, np.x, np.y);

    // Calculate distance to nearest point on nearest side
    var d = p5.Vector.sub(it, np).mag();

    // Get 2 vectors that define nearest side to IT
    // Map distance to side to strokeWeight of side
    var ns = polygon.getNearestSide(it);
    stroke(255);
    strokeWeight(100 - d);
    strokeCap(SQUARE); // Don't add rounded ends to line.
    line(ns.start.x, ns.start.y, ns.end.x, ns.end.y);

    // Get nearest vertex to IT
    var nv = polygon.getNearestVertex(it);
    // Draw a line from mouse to closest point on this side
    // Scale the stroke of the line to the nearest side by the distance
    var d = p5.Vector.sub(it, nv).mag();
    stroke(255);
    strokeWeight(1);
    line(it.x, it.y, nv.x, nv.y);
    noStroke();
    fill(255);
    ellipse(nv.x, nv.y, d, d);

    // Draw IT
    fill(255);
    ellipse(it.x, it.y, 50, 50);
  }

}

function bodyTracked(body) {
  var id = body.trackingId;
  // When there is a new body
  if (!bm.contains(id)) bm.add(body);
  else bm.update(body);
}

// Scale the data to fit the screen
// Move it to the center of the screen
// Return it as a vector
// Use z as x
// Use x as y
function getPos(joint) {
  return createVector((joint.z * xscl) + xshift, (joint.x * yscl) + yshift);
}

// Add vertices to polygon manually
function mousePressed() {
  polygon.addVertex(mouseX, mouseY);
}

function keyPressed() {
  // Switch mode of arrow keys
  if (keyCode == ESCAPE) scl = !scl;

  // Adjust scale of x,z coordinates to map to projection
  if (scl) {
    switch (keyCode) {
      case RIGHT_ARROW:
        xscl++;
        break;
      case LEFT_ARROW:
        xscl--;
        break;
      case UP_ARROW:
        yscl++;
        break;
      case DOWN_ARROW:
        yscl--;
        break;
    }

    xscl = constrain(xscl, 0, width);
    yscl = constrain(yscl, 0, width);
  }
  // Adjust shift
  else {
    switch (keyCode) {
      case RIGHT_ARROW:
        xshift++;
        break;
      case LEFT_ARROW:
        xshift--;
        break;
      case UP_ARROW:
        yshift++;
        break;
      case DOWN_ARROW:
        yshift--;
        break;
    }
    xshift = constrain(xshift, 0, width);
    yshift = constrain(yshift, 0, height);
  }
}