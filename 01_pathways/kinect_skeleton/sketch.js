/*
Mimi Yin NYU-ITP
Drawing skeleton joints
Showing selected joint
 */

// Declare kinectron
var kinectron = null;
// Keep track of selected joint
var j;
// Director of jointsSPINEBASE,
var joints = [
  "SPINEMID",
  "NECK",
  "HEAD",
  "SHOULDERLEFT",
  "ELBOWLEFT",
  "WRISTLEFT",
  "HANDLEFT",
  "SHOULDERRIGHT",
  "ELBOWRIGHT",
  "WRISTRIGHT",
  "HANDRIGHT",
  "HIPLEFT",
  "KNEELEFT",
  "ANKLELEFT",
  "FOOTLEFT",
  "HIPRIGHT",
  "KNEERIGHT",
  "ANKLERIGHT",
  "FOOTRIGHT",
  "SPINESHOULDER",
  "HANDTIPLEFT",
  "THUMBLEFT",
  "HANDTIPRIGHT",
  "THUMBRIGHT"];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("192.168.0.117");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  // Start by tracking left hand
  j = kinectron.HANDLEFT;

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
  var joint = body.joints[j];
  x = (joint.cameraX * width/2) + width/2;
  y = (-joint.cameraY * height/2) + height/2;

  noStroke();
  fill(255);
  push();
  //Kinect location data needs to be normalized to canvas size
  translate(x, y);
  // Draw a bigger ellipse for the selected joint
  ellipse(0, 0, 50, 50);
  pop();

  // Print which joint is selected
  stroke(255);
  textSize(18);
  text("RT/LFT to change joints. " + j + ": " + joints[j], 10, 20);

  // Get the hands off the tracked body and do somethign with them
  //kinectron.getHands(drawJoint);
}

// Draw skeleton
function drawJoint(joint) {

  //console.log("JOINT OBJECT", joint);
  x = (joint.cameraX * width/2) + width/2;
  y = (-joint.cameraY * height/2) + height/2;

  noStroke();
  fill(255);
  push();
  //Kinect location data needs to be normalized to canvas size
  translate(x, y);
	ellipse(0, 0, 10, 10);
  pop();
}

function keyPressed(){
  // Use RIGHT/LEFT arrow keys to change selected joint
  switch(keyCode){
    case LEFT_ARROW:
    	j--;
  		if(j < 0) j = 25-1;
    case RIGHT_ARROW:
    	j++;
  		j%=25;
      break;
  }
}



