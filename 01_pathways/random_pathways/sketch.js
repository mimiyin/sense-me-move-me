/* Mimi Yin, NYU-ITP
Random pathways.
*/

var x, y;
var px, py;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  px = x;
  py = y;
  noStroke();
  background(0);
}

function draw() {
  //background(0);

  //Move
	x += random(-4,4);
	y += random(-4,4);;

  // Draw a line from the previous loc to this loc
  stroke(255);
  line(px, py, x, y);

  // Remember current location for next frame
  px = x;
  py = y;

}