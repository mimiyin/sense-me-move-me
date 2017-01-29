/* Mimi Yin, NYU-ITP
Random pathways with controls.
*/

var x, y;
var px, py;
var xspeed, yspeed;

// Mode of control for arrow keys
var mode;
// # of frames to wait before changing direction.
var interval;
// Range of random, relative range of vertical random
var range, yscl;
// How much to shift right/left, up/down
var xshift, yshift;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  px = x;
  py = y;
  xspeed = 0;
  yspeed = 0;

  mode = 0;
  interval = 1;
  range = 4;
  yscl = 1;
  xshift = 1;
  yshift = 1;

  noStroke();
  background(0);

}

function draw() {
  //background(0);

  //Change direction
  if (frameCount % interval == 0) {
    xspeed = random(-range, range * xshift); //shift median to go right/left
    yspeed = random(-range*yscl, range*yscl * yshift); // shift median to go up/down
  }

  // Move
  x += xspeed;
  y += yspeed;

  // Draw a line from the previous loc to this loc
  stroke(255);
  line(px, py, x, y);

  // Remember current location for next frame
  px = x;
  py = y;

  // Print control values to screen
  noStroke();
  fill(0);
  rect(0, 0, 350, 120);
  fill(255);
  textSize(18);
  text("Press ESC to change mode: " + mode, 10, 20);
  text("mode 0. interval (UP/DWN): " + interval + "\trange (RT/LFT): " + nfs(range, 0, 2), 10, 40);
  text("mode 1. yscl (UP/DWN): " + nfs(yscl, 0, 2), 10, 60);
  text("mode 2. yshift (DWN/UP): " + nfs(yshift, 0, 2) + "\txshift (RT/LFT): " + nfs(xshift, 0, 2), 10, 80);
  text("Press RETURN to clear canvas.", 10, 100);

}

function keyPressed() {
  // Presets
  switch(key) {
    case '1':
      interval = 1;
      range = 4;
      yscl = 1;
      xshift = 1;
      yshift = 1;
      break;
    case '2':
      interval = 1;
      range = 50;
      yscl = 1;
      xshift = 1;
      yshift = 1;
      break;
    case '3':
      interval = 60;
      range = 2;
      yscl = 1;
      xshift = 1;
      yshift = 1;
      break;
    case '4':
      interval = 30;
      range = 2;
      yscl = 2;
      xshift = 1;
      yshift = 1;
    	break;
    case '5':
      interval = 1;
      range = 1;
      yscl = 1;
      xshift = 1.5;
      yshift = .7;
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
      x = width/2;
      y = height/2;
      break;
  }

  switch (mode) {
    case 0:
      switch (keyCode) {
        case UP_ARROW:
          interval++;
          break;
        case DOWN_ARROW:
          interval--;
          break;
        case RIGHT_ARROW:
          range ++;
          break;
        case LEFT_ARROW:
          range --;
          break;
      }
      interval = bottomOut(interval, 1);
      range = bottomOut(range);
      break;
    case 1:
      switch (keyCode) {
        case UP_ARROW:
          yscl += 0.1;
          break;
        case DOWN_ARROW:
          yscl -= 0.1;
          break;
      }
      yscl = bottomOut(yscl, 0);
      break;
    case 2:
      switch (keyCode) {
        case RIGHT_ARROW:
          xshift += 0.1;
          break;
        case LEFT_ARROW:
          xshift -= 0.1;
          break;
        case UP_ARROW:
          yshift -= 0.1;
          break;
        case DOWN_ARROW:
          yshift += 0.1;
          break;
      }
      xshift = bottomOut(xshift, 0);
      yshift = bottomOut(yshift, 0);
      break;
  }
}

// Bottom out at 0
function bottomOut(p, bottom) {
  return p < bottom ? bottom : p;
}