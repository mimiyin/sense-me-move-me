/*
Mimi Yin NYU-ITP
Drawing skeleton joints
Showing selected joint
 */

// Declare kinectron
var kinectron = null;

// Sound files
var yo, zing, buddha;
// Volume of buddha file
var buddhaVol = 0;

// Keep track of previous locations for 3 joints
var pHead = null;
var pHandLeft = null;
var pHandRight = null;

function preload(){
  // Load sound files
  yo = loadSound("data/yo.wav");
  zing = loadSound("data/zing.mp3");
  buddha = loadSound("data/buddha.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  //kinectron = new Kinectron("172.16.228.147");
  kinectron = new Kinectron("192.168.0.112");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  // Cue sounds
  buddha.setVolume(buddhaVol);
  buddha.loop();

  imageMode(CENTER);
  background(0);
}

function draw() {
  //background(0);
}

function bodyTracked(body) {
	background(0);

  // Draw all the joints
  kinectron.getJoints(drawJoint);

  // Get all the joints off the tracked body and do something with them

  // Mid-line
  var head = getPos(body.joints[kinectron.HEAD]);
  var neck = getPos(body.joints[kinectron.NECK]);
  var spineShoulder = getPos(body.joints[kinectron.SPINESHOULDER]);
  var spineMid = getPos(body.joints[kinectron.SPINEMID]);
  var spineBase = getPos(body.joints[kinectron.SPINEBASE]);

  // Right Arm
  var shoulderRight = getPos(body.joints[kinectron.SHOULDERRIGHT]);
  var elbowRight = getPos(body.joints[kinectron.ELBOWRIGHT]);
  var wristRight = getPos(body.joints[kinectron.WRISTRIGHT]);
  var handRight = getPos(body.joints[kinectron.HANDRIGHT]);
  var handTipRight = getPos(body.joints[kinectron.HANDTIPRIGHT]);
  var thumbRight = getPos(body.joints[kinectron.THUMBRIGHT]);

  // Left Arm
  var shoulderLeft = getPos(body.joints[kinectron.SHOULDERLEFT]);
  var elbowLeft = getPos(body.joints[kinectron.ELBOWLEFT]);
  var wristLeft = getPos(body.joints[kinectron.WRISTLEFT]);
  var handLeft = getPos(body.joints[kinectron.HANDLEFT]);
  var handTipLeft = getPos(body.joints[kinectron.HANDTIPLEFT]);
  var thumbLeft = getPos(body.joints[kinectron.THUMBLEFT]);

  // Right Leg
  var hipRight = getPos(body.joints[kinectron.HIPRIGHT]);
  var kneeRight = getPos(body.joints[kinectron.KNEERIGHT]);
  var ankleRight = getPos(body.joints[kinectron.ANKLERIGHT]);
  var footRight = getPos(body.joints[kinectron.FOOTRIGHT]);

  // Left Leg
  var hipLeft = getPos(body.joints[kinectron.HIPLEFT]);
  var kneeLeft = getPos(body.joints[kinectron.KNEELEFT]);
  var ankleLeft = getPos(body.joints[kinectron.ANKLELEFT]);
  var footLeft = getPos(body.joints[kinectron.FOOTLEFT]);

  stroke(255);
  fill(255);

  if(pHead != null) {
    var d = p5.Vector.dist(pHead, head);

    // Constantly moving head, makes buddha talk
    if(d > 10) {
      buddhaVol+=0.5;
    }
    // But Buddha is always fading
    buddhaVol -= 0.1;
    buddha.setVolume(constrain(buddhaVol, 0, 2));

    // Speed of left hand sets off zing
    var d = p5.Vector.dist(pHandLeft, handLeft);
    if(d > 50) {
      zing.jump(0);
      zing.play();
    }
    // Scale textsize to speed of left hand
    noStroke();
    textSize(d);
    text("Zing", handLeft.x, handLeft.y);

    // Speed of right hand sets off yo
    var d = p5.Vector.dist(pHandRight, handRight);
    if(d > 50) {
      yo.jump(0);
      yo.play();
    }

    // Scale textsize to speed of left hand
    textSize(d);
    text("Yo", pHandRight.x, pHandRight.y);
  }

  // Remember positions for next frame
  pHead = head;
  pHandRight = handRight;
  pHandLeft = handLeft;
}

// Scale the data to fit the screen
// Return it as a vector
function getPos(joint) {
  return createVector(joint.cameraX * width/2 + width/2, -joint.cameraY * width/2 + height/2, joint.cameraZ * width/2);
}

// Draw skeleton
function drawJoint(joint) {

  //console.log("JOINT OBJECT", joint);
  var pos = getPos(joint);

  //Kinect location data needs to be normalized to canvas size
  stroke(255);
  strokeWeight(5);
  point(pos.x, pos.y);
}


