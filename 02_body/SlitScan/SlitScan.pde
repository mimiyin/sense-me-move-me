/**
 * Simple Real-Time Slit-Scan Program. 
 * By Golan Levin.
 *
 * This demonstration depends on the canvas height being equal 
 * to the video capture height. If you would prefer otherwise, 
 * consider using the image copy() function rather than the 
 * direct pixel-accessing approach I have used here. 
 */
 
 
import processing.video.*;

Capture video;

int videoSliceX;
int drawPositionX;

void setup() {
  size(1600, 960);
  // This the default video input, see the GettingStartedCapture 
  // example if it creates an error
  video = new Capture(this,640, 480);
  
  // Start capturing the images from the camera
  video.start();  
  
  videoSliceX = video.width / 2;
  drawPositionX = width - 1;
  background(0);
}


void draw() {
  if (video.available()) {
    video.read();
    video.loadPixels();
    
    // Copy a column of pixels from the middle of the video 
    // To a location moving slowly across the canvas.
    loadPixels();
    for (int y = 0; y < video.height; y++){
      int setPixelIndex = y*width + drawPositionX/10;
      int getPixelIndex = y*video.width  + videoSliceX;
      //pixels[setPixelIndex] = video.pixels[getPixelIndex];
      noStroke();
      fill(video.pixels[getPixelIndex], 32);
      float sz = random(100); 
      ellipse(drawPositionX, y*2, sz, sz);
    }
    //updatePixels();
    
    drawPositionX-=10;
    // Wrap the position back to the beginning if necessary.
    if (drawPositionX < 0) {
      drawPositionX = width - 1;
    }
  }
}