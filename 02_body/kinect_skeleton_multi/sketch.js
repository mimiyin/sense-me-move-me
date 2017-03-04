/*
Mimi Yin NYU-ITP
Drawing skeleton joints and bones.
 */

// Declare kinectron
var kinectron = null;
var bodies = {};

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("192.168.0.112");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  background(0);
}

function draw() {
  background(0);
  for(var body in bodies) {
    // Draw all the joints
    var joints = bodies[body].joints;
    for(var j=0; j < joints.length; j++) {
      drawJoint(joints[j]);
    }

    // Get all the joints off the tracked body and do something with them

    // Mid-line
    var head = getPos(joints[kinectron.HEAD]);
    var neck = getPos(joints[kinectron.NECK]);
    var spineShoulder = getPos(joints[kinectron.SPINESHOULDER]);
    var spineMid = getPos(joints[kinectron.SPINEMID]);
    var spineBase = getPos(joints[kinectron.SPINEBASE]);

    // Right Arm
    var shoulderRight = getPos(joints[kinectron.SHOULDERRIGHT]);
    var elbowRight = getPos(joints[kinectron.ELBOWRIGHT]);
    var wristRight = getPos(joints[kinectron.WRISTRIGHT]);
    var handRight = getPos(joints[kinectron.HANDRIGHT]);
    var handTipRight = getPos(joints[kinectron.HANDTIPRIGHT]);
    var thumbRight = getPos(joints[kinectron.THUMBRIGHT]);

    // Left Arm
    var shoulderLeft = getPos(joints[kinectron.SHOULDERLEFT]);
    var elbowLeft = getPos(joints[kinectron.ELBOWLEFT]);
    var wristLeft = getPos(joints[kinectron.WRISTLEFT]);
    var handLeft = getPos(joints[kinectron.HANDLEFT]);
    var handTipLeft = getPos(joints[kinectron.HANDTIPLEFT]);
    var thumbLeft = getPos(joints[kinectron.THUMBLEFT]);

    // Right Leg
    var hipRight = getPos(joints[kinectron.HIPRIGHT]);
    var kneeRight = getPos(joints[kinectron.KNEERIGHT]);
    var ankleRight = getPos(joints[kinectron.ANKLERIGHT]);
    var footRight = getPos(joints[kinectron.FOOTRIGHT]);

    // Left Leg
    var hipLeft = getPos(joints[kinectron.HIPLEFT]);
    var kneeLeft = getPos(joints[kinectron.KNEELEFT]);
    var ankleLeft = getPos(joints[kinectron.ANKLELEFT]);
    var footLeft = getPos(joints[kinectron.FOOTLEFT]);
  }
}

function bodyTracked(body) {
  bodies[body.trackingId] = {
    joints: body.joints,
  }
}

// Scale the data to fit the screen
// Move it to the center of the screen
// Return it as a vector
function getPos(joint) {
  return createVector((joint.cameraX * width/2) + width/2, (-joint.cameraY * width/2) + height/2);
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