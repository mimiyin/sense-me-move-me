/*
Mimi Yin NYU-ITP
Graphing Random
*/

var px, py, x, y;

function setup() {
  createCanvas(windowWidth, windowHeight);
	background(255);
  px = 0;
  py = height/2;
  x = px;
  y = py;
}

function draw() {

  // Advance 10 pixels across the screen.
  x+=10;

  // Generate a new random number for the y-position.
  y = random(height/2) + height/4;

  // Draw a line from last frame's position to this frame's.
 	line(px, py, x, y);

  // Remember this frame's position for the next frame.
  px = x;
  py = y;
}