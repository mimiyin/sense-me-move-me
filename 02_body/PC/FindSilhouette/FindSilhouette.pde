/*
Thomas Sanchez Lengeling.
 http://codigogenerativo.com/
 
 KinectPV2, Kinect for Windows v2 library for processing
 
 Skeleton depth tracking example
 */

import java.util.ArrayList;
import KinectPV2.KJoint;
import KinectPV2.*;

KinectPV2 kinect;
int mode = 1;

void setup() {
  size(512, 424, P3D);

  kinect = new KinectPV2(this);

  //Enables depth and Body tracking (mask image)
  kinect.enableDepthMaskImg(true);
  kinect.enableSkeletonDepthMap(true);

  kinect.init();
}

void draw() {
  background(0);
  PImage img = kinect.getDepthMaskImage();
  //image(img, 0, 0);
  img.loadPixels();

  for (int x = 0; x < img.width; x+=10) {
    for (int y = 0; y < img.height; y+=10) {
      int offset = y * img.width + x;
      color c = img.pixels[offset];
      
      // Check to see if pixel is NOT grayscale
      if (((red(c) + green(c) + blue(c)) / 3) - red(c) > 1 ) {
        PVector point = new PVector(x, y);
        PVector end = new PVector();
        switch(mode) {
        case 0:
          end = PVector.random2D().mult(5);
          end.add(point);
          break;
        case 1:
          end = PVector.random2D().mult(100);
          end.add(point);
          break;
        case 2:
          end = new PVector(width, height);
          break;
        }
        stroke(255, 32);
        strokeWeight(50);
        line(point.x, point.y, end.x, end.y);
      }
    }
  }


  textSize(18);
  text("Press keyboard to change modes. " + mode, 10, 20);
}

void keyPressed() {
  mode++;
  mode%=3;
}