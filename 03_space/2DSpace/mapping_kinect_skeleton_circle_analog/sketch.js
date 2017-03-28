/*
Mimi Yin NYU-ITP
Mapping skeleton locations inside circle.
 */

// Declare kinectron
var kinectron = null;

var center; // center of circle
var sz = 0; // size of circle
var szspeed = 1; // speed at which circle changes size
var diag; // diagonal of screen

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

  diag = sqrt(sq(width) + sq(height));

  xscl = (width/3.2)*0.55;
  yscl = -(width/3.2)*0.6;
  xshift = 0;
  yshift = height / 2;

  // Place circle in upper left-hand corner
  center = createVector(0, 0);

  background(0);
  noStroke();
}

function draw() {
  background(0);

  // Draw the circle
  fill(255);
  ellipse(center.x, center.y, sz, sz);


  // Get positions of all bodies
  var positions = bm.getPositions(kinectron.HEAD);

  // Calculate avgDist2Center and avgDist2Edge
  var avgDist2Center = 0;
  var avgDist2Edge = 0;
  console.log(positions.length);

  for (var p = 0; p < positions.length; p++) {

    // Draw all the body positions
    var pos = getPos(positions[p]);
    fill(255, 0, 0);
    ellipse(pos.x, pos.y, 50, 50);

    //Calculate distance from center
    var dist2Center = p5.Vector.sub(pos, center).mag();
    var dist2Edge = abs((sz / 2) - dist2Center);

    // Add to averages
    avgDist2Center += dist2Center / diag;
    avgDist2Edge += dist2Edge / diag;

  }
  if (positions.length > 1) {
    // Divide by number of vertices
    avgDist2Center /= positions.length;
    avgDist2Edge /= positions.length;
  }

  // Map dist2edge to szspeed
  szspeed = pow(100, avgDist2Edge);
  sz += szspeed;
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