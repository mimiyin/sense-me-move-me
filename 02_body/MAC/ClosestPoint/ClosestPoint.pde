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

// Arraylists to average closest/farthest points over time to make it less jumpy
ArrayList<PVector>closests = new ArrayList<PVector>();
ArrayList<PVector>farthests = new ArrayList<PVector>();

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

  // Start with the farthest point possible
  PVector closestPoint = new PVector(0, 0, maxD);

  // Start with the closest point possible
  PVector farthestPoint = new PVector(0, 0, minD);

  // Store converted points
  ArrayList<PVector>points = new ArrayList<PVector>();

  //Loop through all the points once to figure out the closest point.
  for (int x = 0; x < kinect2.depthWidth; x+=skip) {
    for (int y = 0; y < kinect2.depthHeight; y+=skip) {
      int offset = x + y * kinect2.depthWidth;

      // Ignore points that are too far or close
      if (depth[offset] > maxD || depth[offset] < minD) continue;

      //calculte the x, y, z camera position based on the depth information
      PVector point = depthToPointCloudPos(x, y, depth[offset]);

      // Add to points array
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
      line(point.x, point.y, point.z, closestPoint.x, closestPoint.y, closestPoint.z);
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

  fill(255, 10);
  for (PVector f : farthests) {
    float sz = sin(frameCount*0.01)*100 + 100;
    pushMatrix();
    translate(f.x, f.y, f.z);
    ellipse(0, 0, sz, sz);
    popMatrix();
  }
}

void keyPressed() {
  switch(keyCode) {
  case ESC:
    mode++;
    mode%=3;
    break;
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