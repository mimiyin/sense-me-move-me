/*
Mimi Yin NYU-ITP
Circular Pathways with Controls
*/

var x, y;
var px, py;
var a;
var aspeed;
var yfreq;
var range, yscl;
var centerX, centerY;
var preset = 1;
var mode = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = 0;
  y = 0;

  px = x;
  py = y;

  angle = 0;
  aspeed = 0.01;
  yfreq = 1;

  range = width/4;
  yscl = 1;

  centerX = width/2;
  centerY = height/2;

  background(0);
}

function draw() {
  angle += aspeed;

  //Move
  x = cos(angle)*range + centerX;
  y = sin(angle*yfreq)*range*yscl + centerY;

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  ///////////////////////POLAR ROSES///////////////////////
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////

  // // Spiral
  // range += 0.1;
  // x = cos(angle)*range + centerX;
  // y = sin(angle*yfreq)*range*yscl + centerY;
  //
  // // Straight line
  // x = cos(angle)*range*cos(angle) + centerX;
  // y = sin(angle*yfreq)*range*yscl*sin(angle) + centerY;
  //
  // // Circular squares
  // x = cos(sin(angle)*angle)*range + centerX;
  // y = sin(cos(angle)*angle*yfreq)*range*yscl + centerY;
  //
  // // Just a circle, sorta
  // x = cos(cos(angle)*angle)*range + centerX;
  // y = sin(cos(angle)*angle*yfreq)*range*yscl + centerY;

  // // Inny - Outy
  // x = cos(sin(angle)*angle)*range*sin(angle)+ centerX;
  // y = sin(cos(angle)*angle*yfreq)*range*yscl*cos(angle)+ centerY;

  // Bigger sweeps with tan
  // x = cos(sin(angle)*angle)*range*tan(angle) + centerX;
  // y = sin(cos(angle)*angle*yfreq)*range*yscl*tan(angle) + centerY;

  // Traversing by tan()ing centerX
  // Alternating curves with straight darts
  // x = cos(angle)*range*sin(angle) + centerX*tan(angle);
  // y = sin(cos(angle)*angle*yfreq)*range*yscl*cos(angle) + centerY;

	stroke(255, 64);
  if(frameCount > 1) line(px, py, x, y);

  px = x;
  py = y;

  // Print control values to screen
  noStroke();
  fill(0);
  rect(0, 0, 500, 120);
  fill(255);
  textSize(18);
  text("mode (ESC): " + mode + "\tpreset (0-5): " + preset, 10, 20);
  text("mode 0. yscl (UP/DWN): " + nfs(yscl, 0, 2) + "\trange (RT/LFT): " + nfs(range, 0, 2), 10, 40);
  text("mode 1. yfreq (UP/DWN): " + nfs(yfreq, 0, 2) + "\taspeed (RT/LFT): " + nfs(aspeed, 0, 2), 10, 60);
  text("mode 2. centerY (DWN/UP): " + nfs(centerY, 0, 2) + "\tcenterX (RT/LFT): " + nfs(centerX, 0, 2), 10, 80);
  text("Press RETURN to clear canvas.", 10, 100);
}

function keyPressed() {
  // Presets
  switch(key) {
    //  Big aspeed, more like a polygon
    case '0':
      range = 100;
      yscl = 1;
      aspeed = TWO_PI/3;
      yfreq = 1;
      preset = 0;
      break;
    // "Normal"
    case '1':
      range = 100;
      yscl = 1;
      aspeed = 0.01;
      yfreq = 1;
      preset = 1;
      break;
    // Taller than wide
    case '2':
      range = 100;
      yscl = 2;
      aspeed = 0.01;
      yfreq = 1;
      preset = 2;
      break;
    // Figure 8
    case '3':
      range = 100;
      yscl = 1;
      aspeed = 0.01;
      yfreq = 2;
      preset = 3;
      break;
  }

  switch (keyCode){
    case ESCAPE:
      mode++;
      mode %= 3;
      break;
    // Reset
    case RETURN:
      background(0);
      break;
  }

  switch (mode) {
    case 0:
      switch (keyCode) {
        case UP_ARROW:
          yscl += 0.1;
          break;
        case DOWN_ARROW:
          yscl -= 0.1;
          break;
        case RIGHT_ARROW:
          range++;
          break;
        case LEFT_ARROW:
          range--;
          break;
      }
      yscl = bottomOut(yscl, 0);
      range = bottomOut(range, 0);
      break;
    case 1:
      switch (keyCode) {
        case UP_ARROW:
          yfreq += 0.1;
          break;
        case DOWN_ARROW:
          yfreq -= 0.1;
          break;
        case RIGHT_ARROW:
          aspeed += 0.01;
          break;
        case LEFT_ARROW:
          aspeed -= 0.01;
          break;
      }
      yfreq = bottomOut(yfreq, 0);
      aspeed = bottomOut(aspeed, 0.01);
      break;
    case 2:
      switch (keyCode) {
        case RIGHT_ARROW:
          centerX ++;
          break;
        case LEFT_ARROW:
          centerX --;
          break;
        case UP_ARROW:
          centerY --;
          break;
        case DOWN_ARROW:
          centerY ++;
          break;
      }
      break;
  }
}

// Bottom out at...
function bottomOut(p, bottom) {
  return p < bottom ? bottom : p;
}