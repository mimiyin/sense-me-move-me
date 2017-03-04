/*
  Mimi Yin NYU-ITP
  Thomas Sanchez Lengeling.
  http://codigogenerativo.com/
  KinectPV2, Kinect for Windows v2 library for processing
  Point Cloud example using openGL and Shaders
 */

import java.nio.*;
import KinectPV2.*;

KinectPV2 kinect;

//Distance Threashold
int maxD = 1500; // Up to 4500mm
int minD = 500;  // Down to 500mm

// Resolution of point cloud
int skip = 4;

// Drawing mode
int mode = 0;

// Arraylists to average closest/farthest points over time to make it less jumpy
ArrayList<PVector>closests = new ArrayList<PVector>();
ArrayList<PVector>farthests = new ArrayList<PVector>();

public void setup() {
  size(1280, 720, P3D);

  kinect = new KinectPV2(this);
  kinect.enableDepthImg(true);
  kinect.enablePointCloud(true);
  kinect.init();
}

public void draw() {
  background(0);
  
  pushMatrix();
  translate(width/2, height/2, 50);
  rotateY(3.1);
  //get the points in 3d space
  int[] depth = kinect.getRawDepthData();

  // Start with the farthest point possible
  PVector closestPoint = new PVector(0, 0, maxD);

  // Start with the closest point possible
  PVector farthestPoint = new PVector(0, 0, minD);

  // Save calculated points
  ArrayList<PVector>points = new ArrayList<PVector>();

  //Loop through all the points once to figure out the closest point.
  for (int x = 0; x < KinectPV2.WIDTHDepth; x+=skip) {
    for (int y = 0; y < KinectPV2.HEIGHTDepth; y+=skip) {
      int offset = x + y * KinectPV2.WIDTHDepth;
      
      int z = depth[offset];
      if(z < minD || z > maxD) continue;

      //calculte the x, y, z camera position based on the depth information
      PVector point = depthToPointCloudPos(x, y, z);
            
      // Save points
      points.add(point);

      // Test each point to see if it's closer than the current closest point.
      if (point.z < closestPoint.z) {
        closestPoint = point;
      }
      // Test each point to see if it's farther than the current farthest point.      
      if (point.z > farthestPoint.z) {
        farthestPoint = point;
      }
    }
  }

  // Find average closest/farthest points over the course of 30 frames
  closests.add(closestPoint);
  farthests.add(farthestPoint);

  if (closests.size() > 30) closests.remove(0);
  if (farthests.size() > 30) farthests.remove(0);

  PVector avgClosest = new PVector();
  for (PVector c : closests) {
    avgClosest.add(c);
  }
  avgClosest.div(closests.size());

  PVector avgFarthest = new PVector();
  for (PVector f : farthests) {
    avgFarthest.add(f);
  }
  avgFarthest.div(farthests.size());

  // Calc the distance between the avg closest and farthest points
  float range = PVector.dist(avgClosest, avgFarthest);

  // Loop through it all again to draw
  for (PVector point : points) {
    switch(mode) {
    case 0:
      // Draw a point
      stroke(255);
      // Points repel away from closest point
      PVector repel = PVector.sub(point, avgClosest);
      float distance = repel.mag()/range;
      repel.setMag(100/distance);
      point.add(repel);
      strokeWeight(2);
      point(point.x, point.y, point.z);
      break;
    case 1:
      // Draw a line
      stroke(255, 10);
      line(point.x, point.y, point.z, avgClosest.x, avgClosest.y, avgClosest.z);
      break;
    }
  }

  // Display avg closest
  stroke(255, 0, 0);
  strokeWeight(50);
  point(avgClosest.x, avgClosest.y, avgClosest.z);

  // Display avg farthest
  stroke(0, 0, 255);
  strokeWeight(10);
  point(avgFarthest.x, avgFarthest.y, avgFarthest.z);
  popMatrix();

  // Display instructions
  stroke(255);
  strokeWeight(1);
  textSize(18);
  text("Press TAB to change modes: " + mode, 10, 20);
  text("Press RT/LT arrow keys to adjust skip: " + skip, 10, 40);
}

void keyPressed() {
  switch(keyCode) {
  case TAB:
    mode++;
    mode%=2;
    break;
  case RIGHT:
    skip++;
    break;
  case LEFT:
    skip--;
    break;
  }
  skip = constrain(skip, 4, 20);
}

//calculte the xyz camera position based on the depth data
PVector depthToPointCloudPos(int x, int y, float depthValue) {
  PVector point = new PVector();
  point.z = (depthValue/1.0f);// / (1.0f); // Convert from mm to meters
  point.x = (-(x - CameraParams.cx) * point.z / CameraParams.fx);
  point.y = ((y - CameraParams.cy) * point.z / CameraParams.fy);
  return point;
}