/* Mimi Yin, NYU-ITP
Levy Flight adapted from Dan Shiffman's version for Nature of Code
https://github.com/shiffman/The-Nature-of-Code-Examples/tree/master/introduction/RandomWalkLevy
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

  var stepSize = montecarlo()*100;

  //Move
	x += random(-1,1)*stepSize;
	y += random(-1,1)*stepSize;

  // Draw a line from the previous loc to this loc
  stroke(255);
  line(px, py, x, y);

  // Remember current location for next frame
  px = x;
  py = y;

}

// Calculating stepsize favoring smaller steps
function montecarlo(){
  while (true) {
		var r1 = random(1);
  	var probability = pow(1.0 - r1,8);
    var r2 = random(1);
    if (r2 < probability) {
      return r1;
    }
  }
}