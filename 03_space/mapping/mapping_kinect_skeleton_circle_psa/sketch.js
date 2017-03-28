/*
Mimi Yin NYU-ITP
Drawing skeleton joints and bones.
 */

// Declare kinectron
var kinectron = null;
var xscl, yscl;
var xshift, yshift;
var scl = true;
var bm = new BodyManager();
var DEATH_TH = 1000;

function preload() {

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  //kinectron = new Kinectron("192.168.0.118");
  kinectron = new Kinectron("172.16.231.112");

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

  // Get joints for live bodies
  var joints = bm.getJoints(kinectron.HANDRIGHT);

  for (var j = 0; j < joints.length; j++) {
    // Get the position
    var joint = joints[j];
    var pos = getPos(joint.pos);
    var speed = joint.speed;
    var acceleration = joint.acceleration;

    // Control transparency of circle with speed
    var alpha = speed * 5000 + 32;

    // Control size of the circle with acceleration
    var sz = acceleration * 5000 + 100;
    fill(255, alpha);
    ellipse(pos.x, pos.y, sz, sz);
  }
}

function bodyTracked(body) {
  var id = body.trackingId;
  // When there is a new body, add it
  if (!bm.contains(id)) bm.add(body);
  // Otherwise, update it
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