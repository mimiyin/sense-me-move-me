/* Mimi Yin NYU-ITP
Simply sine and cosine
*/

var r, yOffset;
var dotX, dotY, dotA;
var aSpeed;

function setup() {
  createCanvas(windowWidth, windowHeight);
  r = 100;
  yOffset = height/2;
  dotX = 0;
  dotY = yOffset;
  dotA = 0;
  aSpeed = TWO_PI/width;
}

function draw() {
  background(255);

  fill(0);
  noStroke();
  var x = 0;
  for(var a = 0; a < TWO_PI; a+=aSpeed) {
    x++;

    // Draw ellipse for sine wave
    var y = sin(a)*r + height/2;
    ellipse(x, y, 1, 1);

    // Draw ellipse for cosine wave
    var y = cos(a)*r + height/2;
    ellipse(x, y, 1, 1);
  }

  dotX++;
  dotA += aSpeed;

  if(dotX > width) dotX = 0;
  fill(255, 0, 0);

  // Draw dot for sine wave.
  dotY = sin(dotA)*r + height/2;
  ellipse(dotX, dotY, 10, 10);

  // Draw dot for cosine wave.
  dotY = sin(dotA + PI/2)*r + height/2;
  ellipse(dotX, dotY, 10, 10);
}

