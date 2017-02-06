/*
Mimi Yin NYU-ITP
Drawing a trail with selected joint in 4 ways
*/

// Declare kinectron
var kinectron = null;
var j;
var locs = [];

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

  // Initialize values
  j = kinectron.HANDLEFT;

  background(255);
}

function draw() {
}

function bodyTracked(body) {
  background(0);

  // Draw all the joints
  //kinectron.getJoints(drawJoint);

  // Get the selected joint to draw with its position
  var joint = body.joints[j];
  x = (joint.cameraX * width/2) + width/2;
  y = (-joint.cameraY * height/2) + height/2;

  // Add to stored positions
  locs.push(createVector(x, y));
  // Start pushing out oldest position after 50 frames
  if(locs.length > 50) locs.shift();

  fill(255, 64);
  noStroke();
  // Draw positions as ellipses
  for (var l = 0 ; l < locs.length; l++) {
      // Throbbing
      var sz = sin(frameCount*0.01)*l + l/2;
      // Easing
      locs[l].x += (x-locs[l].x)*0.001;
      locs[l].y += (y-locs[l].y)*0.001;
      ellipse(locs[l].x, locs[l].y, sz, sz);
  }


  // Get the hands off the tracked body and do somethign with them
  //kinectron.getHands(drawJoint);
}

// Draw skeleton
function drawJoint(joint) {

  //console.log("JOINT OBJECT", joint);
  x = (joint.cameraX * width/2) + width/2;
  y = (-joint.cameraY * height/2) + height/2;
  z = joint.cameraZ * 100;

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
    case ENTER:
      background(255);
      break;
  }
}



