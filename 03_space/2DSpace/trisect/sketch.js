/*
Mimi Yin NYU-ITP
Trisect space.
Horizontal and Vertical.
*/


var moving = false;
var horizontal = false;
var w, h;

function setup() {
  createCanvas(windowWidth, windowHeight);
  w = 0;
  h = 0;
  noStroke();
  rectMode(CENTER);
}

function draw() {
  background(0);

  fill(255);

  // Draw the cells
  if (horizontal) rect(width/2, height/2, width, h);
  else rect(width/2, height/2, w, height);
}

function keyPressed() {
  // Adjust number of columns and rows
  // ESC inverts black and white
  switch (keyCode) {
    case ESCAPE:
      horizontal = !horizontal;
      break;
    case RIGHT_ARROW:
      w++;
      break;
    case LEFT_ARROW:
      w--;
      break;
    case UP_ARROW:
      h++;
      break;
    case DOWN_ARROW:
      h--;
      break;
  }

  // Limit cols/rows to 0-10
  w = constrain(w, 0, width);
  h = constrain(h, 0, height);
}