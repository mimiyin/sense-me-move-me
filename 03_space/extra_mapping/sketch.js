/*
Mimi Yin NYU-ITP
Extra mapping techniques.
*/
var sound;
var x = 0;

function preload(){
  sound = loadSound("data/rain.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sound.setVolume(0);
  sound.loop();
  background(0);
}

function draw() {
  background(0);
  // Zeno's Paradox: Move only a % of the way towards your destination
	//x += (mouseX-x)*0.01;

  // // Move based on speed
  // x += abs(mouseX-pmouseX);
  // // But always lose ground
  // x-=10;

  var volume = x / width;
  sound.setVolume(volume);
  fill(255);
  ellipse(x, height/2, volume*100 + 50, volume*100 + 50);
}

