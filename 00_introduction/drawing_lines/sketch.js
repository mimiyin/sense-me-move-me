/*
Mimi Yin NYU-ITP
Drawing lines.
*/

var mode = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
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
  		sw = map(speed, 0, 100, 10, 1);
      break;
  }

  strokeWeight(sw);
  line(pmouseX, pmouseY, mouseX, mouseY);
}

function mousePressed(){
 	mode++;
  mode%=4;
}

