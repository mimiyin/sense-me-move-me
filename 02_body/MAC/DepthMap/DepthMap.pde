// Mimi Yin
// Daniel Shiffman
// Thomas Sanchez Lengeling
// Kinect Point Cloud example

// https://github.com/shiffman/OpenKinect-for-Processing
// http://shiffman.net/p5/kinect/

import org.openkinect.processing.*;
import java.nio.FloatBuffer;

// Kinect Library object
Kinect2 kinect2;

// Resolution of point cloud
int skip = 2;

//Depth distance thresholds
int maxD = 1500; // 4.5m
int minD = 500;  //  0m

// Visualization modes
int mode = 0;

public void setup() {
  size(1280, 720, P3D);

  kinect2 = new Kinect2(this);
  kinect2.initDepth();
  kinect2.initDevice();
}

public void draw() {
  background(0);

  //translate the scene to the center
  translate(width / 2, height / 2, 50);
  rotateY(3.1);

  //get the points in 3d space
  int[] depth = kinect2.getRawDepth();

  //Loop through all the points once to figure out the closest point.
  for (int x = 0; x < kinect2.depthWidth; x+=skip) {
    for (int y = 0; y < kinect2.depthHeight; y+=skip) {
      int offset = x + y * kinect2.depthWidth;
      float z = depth[offset];

      // Ignore points that are too far or close
      if (z > maxD || z < minD) continue;

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