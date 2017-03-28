/*
Mimi Yin NYU-ITP
Extra mapping techniques.
*/
var sound;
var value = 0;
var mode = 0;

function preload() {
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
  switch (mode) {
    // Zeno's Paradox: Move only a % of the way towards the mouse
    case 0:
      value += (mouseX - value ) * 0.01;
      break;
    case 1:
      // Move based on speed of mouse
      value += abs(mouseX - pmouseX);
      // But always lose ground
      value -= 10;
      break;
  }

  var volume = value / width;
  sound.setVolume(volume);
  fill(255);
  var sz = volume*100 + 50;
  ellipse(value, height / 2, sz, sz);
}

function keyPressed() {
  mode++;
  mode%=2;
}