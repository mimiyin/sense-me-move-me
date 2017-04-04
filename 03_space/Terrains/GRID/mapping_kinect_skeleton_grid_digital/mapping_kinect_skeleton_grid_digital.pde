/*
 Mimi Yin NYU-ITP
 
 Thomas Sanchez Lengeling.
 http://codigogenerativo.com/
 
 KinectPV2, Kinect for Windows v2 library for processing
 
 3D Skeleton.
 Some features a not implemented, such as orientation
 */

import KinectPV2.KJoint;
import KinectPV2.*;

KinectPV2 kinect;

// Mapping Kinect data to projection
float xshift, yshift;
float xscl, yscl;
boolean scl;

// Grid
int cols = 10;
int rows = 20;
float colW, rowH;

void setup() {
  size(1024, 768);

  kinect = new KinectPV2(this);

  //enable 3d  with (x,y,z) position
  kinect.enableSkeleton3DMap(true);

  kinect.init();
  
  // Calculate size of ceels
  colW = width/cols;
  rowH = height/rows;


  // Parameters for mapping Kinect data to projection
  xscl = width/3.2*0.55;
  yscl = -width/3.2*0.6;
  xshift = 0;
  yshift = height/2;
}

void draw() {
  background(0);

  // Get all the tracked skeletons
  ArrayList<KSkeleton> skeletonArray =  kinect.getSkeleton3d();
  for (int col = 0; col < cols; col++) {
    float x = col*colW;
    for (int row = 0; row < rows; row++) {
      float y = row*rowH;
      color c = color(255);
      // Get position of each skeleton
      for (int s = 0; s < skeletonArray.size(); s++) {
        KSkeleton skeleton = (KSkeleton) skeletonArray.get(s);
        if (skeleton.isTracked()) {
          KJoint[] joints = skeleton.getJoints();
          PVector pos = getPos(joints[KinectPV2.JointType_Head]);
          
          // Check to see if body is inside this cell
          if(pos.x > x && pos.x < x+colW && pos.y > y && pos.y < y+rowH) c = color(255, 0, 0);
        }
      }

      fill(c);
      rect(x, y, colW, rowH);
    }
  }
}

// Scale Kinect data to projection
PVector getPos(KJoint joint) {
  return new PVector(joint.getX()*xscl + xshift, joint.getZ()*yscl + yshift);
}

void keyPressed() {
  // Press TAB to switch between adjust scl v. shift
  if (keyCode == TAB) scl = !scl;

  // Adjust scale of x,z coordinates to map to projection
  if (scl) {
    switch(keyCode) {
    case RIGHT:
      xscl++;
      break;
    case LEFT:
      xscl--;
      break;
    case UP:
      yscl++;
      break;
    case DOWN:
      yscl--;
      break;
    }

    xscl = constrain(xscl, 0, width);
    yscl = constrain(yscl, 0, width);
  }
  // Adjust shift
  else {
    switch(keyCode) {
    case RIGHT:
      xshift++;
      break;
    case LEFT:
      xshift--;
      break;
    case UP:
      yshift++;
      break;
    case DOWN:
      yshift--;
      break;
    }
    xshift = constrain(xshift, 0, width);
    yshift = constrain(yshift, 0, height);
  }
}