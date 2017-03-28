/*
Mimi Yin NYU-ITP
Bisect space.
Horizontal and Vertical.
*/

var horizontal = false;
var x, y;
var counter;

function setup() {
  createCanvas(1080, windowHeight);
  x = 0;
  y = 0;
  counter = 0;
  noStroke();
}

function draw() {
  background(0);


  // Calculate the position
  // Google 2^x to see the shape of numbers you will get
  counter += 0.01;
  x = pow(2, counter);
  y = pow(2, counter);

  // Draw the cells
  fill(255);
  if (horizontal) rect(0, 0, width, y);
  else rect(0, 0, x, height);
}

function keyPressed() {
  // Adjust number of columns and rows
  // ESC inverts black and white
  switch (keyCode) {
    case ESCAPE:
      horizontal = !horizontal;
      counter = 0;
      break;
  }
}