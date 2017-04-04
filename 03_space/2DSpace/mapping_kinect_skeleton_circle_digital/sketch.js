/*
Mimi Yin NYU-ITP
Mapping Kinect Skeleton locations to floor projection.
 */

// Declare kinectron
var kinectron = null;

var center; // center of circle
var sz = 0; // size of circle
var szspeed = 1; // speed at which circle changes size
var diag = 0; // diag of canvas

// Mapping Kinect data to projecion
var xscl, yscl;
var xshift, yshift;
var scl = true;

// Managing kinect bodies
var bm = new BodyManager();
var DEATH_TH = 1000;

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

  // Place circle in upper left-hand corner
  center = createVector(random(width), random(height));
  // Calculate maximum distance to normalize data
  diag = sqrt(sq(width) + sq(height));

  background(0);
  noStroke();
}

function draw() {
  background(0);

  // Get positions of all bodies
  var positions = bm.getPositions(kinectron.HEAD);

  // Calculate radius of circle
  var r = sz / 2;
  // Color of circle
  var c = color(0);

  for (var p = 0; p < positions.length; p++) {

    // Get the position
    var pos = getPos(positions[p]);

    //Calculate distance from center
    var d = p5.Vector.sub(pos, center).mag();

    // Color it red if someone is inside the circle.
    if (d < r) c = color(255, 0, 0);
    else c = color(0);

    fill(255);
    ellipse(pos.x, pos.y, 50, 50);
  }

  fill(c);
  ellipse(center.x, center.y, sz, sz);

  //Grow the circle
  sz++;
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