/*
Mimi Yin NYU-ITP
Circular Pathways
*/

var x, y, angle, r;
function setup() {
  createCanvas(windowWidth, windowHeight);
  angle = 0;
  r = 100;
  x = width/2;
  y = height/2-r;
}

function draw() {
	fill(0);
  angle += 0.01;

  //Method 1
  x = cos(angle)*r + width/2;
  y = sin(angle)*r + height/2;

  //Method 2
  // x += cos(angle);
  // y += sin(angle);

  ellipse(x, y, 1, 1);
}