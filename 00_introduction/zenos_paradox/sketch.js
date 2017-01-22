/*
Mimi Yin NYU-ITP
Demonstration of Zeno's Paradox
or easing.
*/
var x;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = 0;
}

function draw() {
  background(255);
  fill(0);

  // Move 1% of the remaining distance to the right
  x += (width-x)*0.01;
  ellipse(x, height/2, 10,10);
}