/*
Mimi Yin NYU-ITP
Drawing lines with selected joint in 4 ways
*/

// Declare kinectron
var kinectron = null;
var mode;
var j;
var x, y, z;
var px, py, pz;

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
  mode = 1;
  j = kinectron.HANDLEFT;

  background(255);
}

function draw() {
}

function bodyTracked(body) {

  // Draw all the joints
  //kinectron.getJoints(drawJoint);

  // Get the selected joint to draw with its position
  var joint = body.joints[j];
  x = (joint.cameraX * width/2) + width/2;
  y = (-joint.cameraY * height/2) + height/2;
  z = joint.cameraZ * 100;

  // Print out x,y values
  //console.log(joint);
  //console.log(frameCount + "\tx: " + nfs(x, 0, 2) + "\ty: " + nfs(y, 0, 2) + "\tz: " + nfs(z, 0, 2));

  if(mode < 4 && px != null) {
  	//console.log("px: " + nfs(px, 0, 2) + "\tpy: " + nfs(py, 0, 2) + "\tpz: " + nfs(pz, 0, 2));

    var speed = dist(px, py, pz, x, y, z);
    var sw = 1;

    // 3 ways to set strokeweight according to speed.
    switch(mode){
      case 1:
        sw = speed/10;
        break;
      case 2:
        sw = 100/speed;
        break;
      case 3:
        sw = map(speed, 0, 100, 10, 0);
        break;
    }

    // Draw the line
    stroke(0);
    strokeWeight(sw);
    line(px, py, x, y);
  }

  // Store current location for next frame
  px = x;
  py = y;
  pz = z;

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
    case UP_ARROW:
      mode++;
      mode%=4;
      break;
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



