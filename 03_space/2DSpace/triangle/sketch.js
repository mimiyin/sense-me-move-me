var sz;
var szspeed = 0.1;
var invert = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  sz = height;
  noStroke();
}

function draw() {
  background(invert ? 0: 255);

  push();
  translate(mouseX, mouseY);
  rotate(frameCount*0.005);

  // Bounce speed
  sz+=szspeed;
  if(sz > height || sz < 0) szspeed *= -1;

  fill(invert ? 255: 0);

  // Draw Triangle
  beginShape();
  	vertex(0, -sz);
  	vertex(sz, sz);
  	vertex(-sz, sz);
  endShape(CLOSE);
  pop();
}

// Invert background/foreground colors
function mousePressed(){
 invert = !invert;
}

