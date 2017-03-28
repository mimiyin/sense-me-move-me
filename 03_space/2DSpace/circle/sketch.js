var sz = 0;
var invert = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(invert ? 0: 255);
  sz++;
  fill(invert ? 255: 0);
  ellipse(0, 0, sz, sz);
}

// Invert black and white
function mousePressed(){
 invert = !invert;
}