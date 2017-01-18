/* Mimi Yin, NYU-ITP
Noisy pathways.
*/

var x, y;
var px, py;
var t;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  px = x;
  py = y;
  t = 0;
  noStroke();
  background(0);
}

function draw() {
  //background(0);

  // Move along noise curve.
  t += 0.01;

  //Move
	x += 2*(noise(t)-0.5);
	y += 2*(noise(t*2)-0.5);

  // Draw a line from the previous loc to this loc
  stroke(255);
  line(px, py, x, y);

  // Remember current location for next frame
  px = x;
  py = y;
}