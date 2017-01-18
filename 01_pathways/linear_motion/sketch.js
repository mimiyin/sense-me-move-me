/* Mimi Yin, NYU-ITP
Linear motion.
*/
var x, y;

function setup() {
    createCanvas(windowWidth, windowHeight);
    x = width*.53;
    y = height*.07;
    noStroke();
}

function draw() {
  background(0);

  //Move
  x += .2;
  y += .8;

  // Draw3
  fill(255);
  ellipse(x, y, 10, 10);
}