/*
Mimi Yin NYU-ITP
Mapping mouse to sound.
*/

var marimba, rain, thunder;
var counter = 60;

function preload() {
  marimba = loadSound("data/marimba.mp3");
  rain = loadSound("data/rain.mp3");
  thunder = loadSound("data/thunder.mp3");
}

function setup()
{
  createCanvas(windowWidth, windowHeight);
  marimba.loop();
  rain.loop();
}

function draw()
{
  background(0);
  stroke(255);

  var marimbaVol = map(mouseX, 0, width, 0, 5);
  marimba.setVolume(marimbaVol);

  var rainVol = map(mouseY, 0, height,  0, 5);
  rain.setVolume(rainVol);
  var distance = dist(mouseX, mouseY, pmouseX, pmouseY);
  if ( distance > width/8 && counter > 60) {
    thunder.setVolume(5);
    thunder.jump();
    counter = 0;
  }
  counter++;
}