/* Mimi Yin NYU-ITP
Visualizing rate of change of sine
and cosine waves with tangents.
*/

var r, yOffset;
var dotX, dotY, dotA;
var aSpeed;
var tanA;

function setup() {
  createCanvas(windowWidth, windowHeight);
  r = 100;
  yOffset = height/2;
  dotX = 0;
  dotY = yOffset;
  dotA = 0;
  aSpeed = TWO_PI/width;
  tanA = 0;
}

function draw() {
  background(255);
  dotX++;
  dotA += aSpeed;

  // Draw sine
  wave(0);
  // Draw cosine
  wave(PI/2);

}

function wave(startAngle) {
	fill(0);
  noStroke();
  var x = 0;
  for(var a = startAngle; a < TWO_PI + startAngle; a+=aSpeed) {
    x++;
    var y = sin(a)*r + height/2;
    ellipse(x, y, 1, 1);
  }

  if(dotX > width) dotX = 0;
  dotY = sin(dotA + startAngle)*r + height/2;
  fill(255, 0, 0);
  ellipse(dotX, dotY, 10, 10);

  // Calculate the angle of the tangent
  tanA = atan(cos(dotA + startAngle)) - PI/4;
  // Draw tangent
  stroke(0);
  push();
  translate(dotX, dotY);
  rotate(tanA);
  line(-50, -50, 50, 50);
  push();
  translate(50, 50);
  rotate(PI/8);
  line(0, 0, -10, -10);
  pop();
  push();
  translate(50, 50);
  rotate(-PI/8);
  line(0, 0, -10, -10);
  pop();
  pop();
}