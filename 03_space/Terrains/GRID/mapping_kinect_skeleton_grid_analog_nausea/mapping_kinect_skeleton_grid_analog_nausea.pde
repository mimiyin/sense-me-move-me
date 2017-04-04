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
int sz = 10;
float diag;
PImage img, text;

void setup() {
  size(displayWidth, displayHeight, P2D);

  kinect = new KinectPV2(this);

  //enable 3d  with (x,y,z) position
  kinect.enableSkeleton3DMap(true);

  kinect.init();

  // Calc diagonal of screen
  diag = sqrt(sq(width) + sq(height));
  // Parameters for mapping Kinect data to projection
  // Parameters for mapping Kinect data to projection
  xscl = width/3.2*0.55;
  yscl = -width/3.2*0.6;
  xshift = 0;
  yshift = height/2;

  // Load image to distort
  img = loadImage("mondrian.jpg");
  // Resize the image to fit the screen
  img.resize(width, img.height*width/img.width);
  
  text = loadImage("texture.png");
}

void draw() {
  background(0);
  PVector avgPos = new PVector();
  
  // Get all the tracked skeletons
  ArrayList<KSkeleton> skeletons =  kinect.getSkeleton3d();
  for (int x = 0; x < width; x+=sz) {
    for (int y = 0; y < height; y += sz) {
      // Draw the joints for each skeleton
      for (KSkeleton skeleton : skeletons) {
        if (skeleton.isTracked()) {
          KJoint[] joints = skeleton.getJoints();
          PVector pos = getPos(joints[KinectPV2.JointType_Head]);
          avgPos.add(pos);
        }
      }

      // Find the average distance
      avgPos.div(skeletons.size()).div(diag);

      float sz = 250*PVector.dist(avgPos, new PVector(x,y));
      color c = img.get(x, y);
      tint(c, 128);
      image(text, x, y, sz, sz);
    }
  }
}

// Scale Kinect data to projection
PVector getPos(KJoint joint) {
  return new PVector(joint.getZ()*xscl + xshift, joint.getX()*yscl + yshift);
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