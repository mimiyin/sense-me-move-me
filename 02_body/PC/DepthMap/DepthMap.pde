/*
Thomas Sanchez Lengeling.
 http://codigogenerativo.com/
 KinectPV2, Kinect for Windows v2 library for processing
 
 Point Cloud example using openGL and Shaders
 */

import java.nio.*;
import KinectPV2.*;

KinectPV2 kinect;

//Distance Threashold
int maxD = 1500; // 4.5m
int minD = 500;  //  0m

// Resolution of point cloud
int skip = 2;

// Drawing mode
int mode = 0;

public void setup() {
  size(1280, 720, P3D);

  kinect = new KinectPV2(this);
  kinect.enableDepthImg(true);
  kinect.enablePointCloud(true);
  kinect.init();
}

public void draw() {
  background(0);

  //translate the scene to the center
  translate(width / 2, height / 2, 50);
  rotateY(3.1);

  //get the points in 3d space
  int[] depth = kinect.getRawDepthData();

  //Loop through all the points once to figure out the closest point.
  for (int x = 0; x < KinectPV2.WIDTHDepth; x+=skip) {
    for (int y = 0; y < KinectPV2.HEIGHTDepth; y+=skip) {
      int offset = x + y * KinectPV2.WIDTHDepth;
      float z = depth[offset];
      
      // If it's outside of the depth threshold, move on to next point
      if (z < minD || z > maxD) continue;

      //calculte the x, y, z camera position based on the depth information
      PVector point = depthToPointCloudPos(x, y, z);
      point(point.x, point.y, point.z);
    }
  }
}

void keyPressed() {
  switch(keyCode) {
  case RIGHT:
    skip++;
    break;
  case LEFT:
    skip--;
    break;
  }
  skip = constrain(skip, 2, 20);
}

//calculte the xyz camera position based on the depth data
PVector depthToPointCloudPos(int x, int y, float depthValue) {
  PVector point = new PVector();
  point.z = (depthValue/1.0f);// / (1.0f); // Convert from mm to meters
  point.x = (x - CameraParams.cx) * point.z / CameraParams.fx;
  point.y = (y - CameraParams.cy) * point.z / CameraParams.fy;
  return point;
}