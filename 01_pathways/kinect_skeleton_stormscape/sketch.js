/*
Mimi Yin NYU-ITP
Mapping joint movement to sounds.
 */

// Declare kinectron
var kinectron = null;

// Sound files
var marimba, rain, thunder;

// Keep track of previous locations for 3 joints
var pHead = null;

function preload() {
  // Load sound files
  marimba = loadSound("data/marimba.mp3");
  rain = loadSound("data/rain.mp3");
  thunder = loadSound("data/thunder.mp3");
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
  marimba.loop();
  rain.loop();

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

  // As the hands get closer, the marimba quiets down
  var d = p5.Vector.dist(handLeft, handRight);
  marimba.setVolume(d / 100);

  // As the left hand gets closer to the head, the rain gets louder, non-linearly
  var d = p5.Vector.dist(handLeft, head);
  rain.setVolume(10 / d);

  if (pHead != null) {
    var d = p5.Vector.dist(pHead, head);

    // Speed of head sets off thunder
    // Only set it off 1x
    if (d > 50 && (thunder.currentTime() == 0 || thunder.currentTime() > 2)) {
      thunder.jump(0);
      // Wait half a second to play to avoid distortion
      setTimeout(function () {
        thunder.play();
      }, 500);
    }
  }

  // Remember position for next frame
  pHead = head;
}

// Scale the data to fit the screen
// Return it as a vector
function getPos(joint) {
  return createVector(joint.cameraX * width / 2 + width / 2, -joint.cameraY * width / 2 + height / 2, joint.cameraZ * width / 2);
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