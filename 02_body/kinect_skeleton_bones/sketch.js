/*
Mimi Yin NYU-ITP
Drawing skeleton joints
Showing selected joint
 */

// Declare kinectron
var kinectron = null;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.16.228.147");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  background(0);
}

function draw() {
  //background(0);
}

function bodyTracked(body) {
	background(0);

  push();
  translate(width/2, height/2);
  scale(width/2, -width/2);
  noFill();

  // Draw all the joints
  kinectron.getJoints(drawJoint);

  // Get all the joints off the tracked body and do something with them

  // Mid-line
  var head = body.joints[kinectron.HEAD];
  var neck = body.joints[kinectron.NECK];
  var spineShoulder = body.joints[kinectron.SPINESHOULDER];
  var spineMid = body.joints[kinectron.SPINEMID];
  var spineBase = body.joints[kinectron.SPINEBASE];

  // Right Arm
  var shoulderRight = body.joints[kinectron.SHOULDERRIGHT];
  var elbowRight = body.joints[kinectron.ELBOWRIGHT];
  var wristRight = body.joints[kinectron.WRISTRIGHT];
  var handRight = body.joints[kinectron.HANDRIGHT];
  var handTipRight = body.joints[kinectron.HANDTIPRIGHT];
  var thumbRight = body.joints[kinectron.THUMBRIGHT];

  // Left Arm
  var shoulderLeft = body.joints[kinectron.SHOULDERLEFT];
  var elbowLeft = body.joints[kinectron.ELBOWLEFT];
  var wristLeft = body.joints[kinectron.WRISTLEFT];
  var handLeft = body.joints[kinectron.HANDLEFT];
  var handTipLeft = body.joints[kinectron.HANDTIPLEFT];
  var thumbLeft = body.joints[kinectron.THUMBLEFT];

  // Right Leg
  var hipRight = body.joints[kinectron.HIPRIGHT];
  var kneeRight = body.joints[kinectron.KNEERIGHT];
  var ankleRight = body.joints[kinectron.ANKLERIGHT];
  var footRight = body.joints[kinectron.FOOTRIGHT];

  // Left Leg
  var hipLeft = body.joints[kinectron.HIPLEFT];
  var kneeLeft = body.joints[kinectron.KNEELEFT];
  var ankleLeft = body.joints[kinectron.ANKLELEFT];
  var footLeft = body.joints[kinectron.FOOTLEFT];

  noFill();
  stroke(255);
  strokeWeight(0.001);

  // Draw Bust
  beginShape();
    createVertex(head);
    createVertex(neck);
    createVertex(spineShoulder);
    createVertex(spineMid);
    createVertex(spineBase);
  endShape();

  // Draw shoulders
  line(spineShoulder.cameraX, spineShoulder.cameraY, shoulderRight.cameraX, shoulderRight.cameraY);

  // Draw Right Arm
  beginShape();
    createVertex(shoulderRight);
    createVertex(elbowRight);
    createVertex(wristRight);
    createVertex(handRight);
    createVertex(handTipRight);
    createVertex(thumbRight);
  endShape();

  // Draw Left Arm
  beginShape();
    createVertex(shoulderLeft);
    createVertex(elbowLeft);
    createVertex(wristLeft);
    createVertex(handLeft);
    createVertex(handTipLeft);
    createVertex(thumbLeft);
  endShape();

  // Draw Right Leg
  beginShape();
    createVertex(hipRight);
    createVertex(kneeRight);
    createVertex(ankleRight);
    createVertex(footRight);
  endShape();

  // Draw Left Leg
  beginShape();
    createVertex(hipLeft);
    createVertex(kneeLeft);
    createVertex(ankleLeft);
    createVertex(footLeft);
  endShape();

  // Draw  shape
  beginShape();
    createVertex(hipLeft);
    createVertex(thumbRight);
    createVertex(head);
    createVertex(footRight);
    createVertex(shoulderLeft);
  endShape();

  // Draw curved shape
  beginShape();
    createCurveVertex(hipLeft);
    createCurveVertex(thumbRight);
    createCurveVertex(head);
    createCurveVertex(footRight);
    createCurveVertex(shoulderLeft);
  endShape();

  pop();
}

function createVertex(joint) {
  vertex(joint.cameraX, joint.cameraY);
}

function createCurveVertex(joint) {
  curveVertex(joint.cameraX, joint.cameraY);
}

// Draw skeleton
function drawJoint(joint) {

  //console.log("JOINT OBJECT", joint);
  x = joint.cameraX;
  y = joint.cameraY;

  //Kinect location data needs to be normalized to canvas size
  stroke(255);
  strokeWeight(0.01);
	ellipse(x, y, 0.001, 0.001);
}



