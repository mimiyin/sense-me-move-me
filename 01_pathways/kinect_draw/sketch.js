/*
Mimi Yin NYU-ITP
Drawing with kinect joints.
 */

// Declare kinectron
var kinectron = null;
var j = 0;
var joint = null;
var mode = 0;
var locs = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);
  noStroke();

  // Define and create an instance of kinectron
  kinectron = new Kinectron("192.168.0.117");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);
}

function draw() {
  if(joint) {
    if(mode < 4) {
      var sw = 1;
      switch(mode) {
        case 1:
          sw = speed/10;
          break;
        case 2:
          sw = 100/speed;
          break;
        case 3:
          sw = map(speed, 0, 100, 10, 1);
          break;
      }
      stroke(255);
      strokeWeight(sw);
      line(px, py, pz, joint.x, joint.y, joint.z);
    }
    else {
      background(0);
      locs.push(createVector(joint.x, joint.y, joint.z));
      if(locs.length > 50) locs.shift();
      for(var l = 0; l < locs.length; l++){
        var sz = 0;
        switch(mode) {
          case 4:
            sz = 10;
            break;
          case 5:
            sz = sin(frameCount*0.001)*l + l;
            break;
          case 6:
            locs[l].x += (joint.x - locs[l].x)*0.01;
            locs[l].y += (joint.y - locs[l].y)*0.01;
            locs[l].z += (joint.z - locs[l].z)*0.01;
            break;
        }
        push();
        translate(locs[l].x, locs[l].y, locs[l].z);
        strokeWeight(sz);
        point(0,0);
      }
    }

    px = joint.x;
    py = joint.y;
    pz = joint.z;
  }
}

function bodyTracked(body) {
  // Get all the joints off the tracked body and do something with them
  kinectron.getJoints(drawJoint);

}

// Draw skeleton
function drawJoint(joint) {
  push();
  //Kinect location data needs to be scaled to canvas size
  translate(joint.depthX * myCanvas.width, joint.depthY * myCanvas.height, joint.depthZ * myCanvas.width);
  fill(255);
  ellipse(0, 0, 10, 10);
  pop();
}

function keyPressed(){
 	j++;
  j%=kinectron.joints.length;
  joint = kinectron.joints[j];
  px = joint.x;
  py = joint.y;
  pz = joint.z;
}

function mousePressed(){
  mode++;
  mode%=7;
}



