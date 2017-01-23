/* Mimi Yin NYU-ITP
Drawing a trail.
*/

var locs = [];
var easing = false;
var throbbing = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  noStroke();
  fill(255, 64);

  // Add current mouse position to locs array
  locs.push(createVector(mouseX, mouseY));

  // Remove the oldest mouse location after 50 frames
  if(locs.length> 50) locs.shift();

  // Iterate through last 50 mouse positions
  for(var l = 0; l < locs.length; l++) {

    // Turn on throbbing
    var sz;
    if(throbbing) sz = sin(frameCount*0.01)*l + l;
    else sz = 10;

    // Turn on easing
		if(easing) {
      locs[l].x+=(mouseX-locs[l].x)*0.01;
      locs[l].y+=(mouseY-locs[l].y)*0.01;
    }

    // Draw an ellipse at this location
  	ellipse(locs[l].x, locs[l].y, sz, sz);

    // Draw instructions to screen
    text("Press 'e' to ease. Press 't' to throb.", 10, 20);
  }
}

function keyPressed(){
  console.log(key);
  switch(key){
    case 'E':
      easing = !easing;
      break;
    case 'T':
      throbbing = !throbbing;
      break;
  }
}