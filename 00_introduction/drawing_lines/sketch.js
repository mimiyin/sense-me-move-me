/*
Mimi Yin NYU-ITP
Drawing lines.
*/

var mode = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
}

function draw() {
  var speed = dist(pmouseX, pmouseY, mouseX, mouseY);
	var sw = 1;

  // 3 ways to set strokeweight according to speed.
  switch(mode){
    case 1:
      sw = speed/10;
      break;
    case 2:
  		sw = 100/speed;
      break;
    case 3:
  		sw = map(speed, 0, 100, 10, 0);
      break;
  }

  stroke(0);
  strokeWeight(sw);
  line(pmouseX, pmouseY, mouseX, mouseY);

  // Draw instructions to screen
  noStroke();
  fill(255);
	rect(0, 0, 500, 50);
  fill(0);
  text("Press mouse to change modes. There are 4.", 10, 20);
}

function mousePressed(){
 	mode++;
  mode%=4;
}

