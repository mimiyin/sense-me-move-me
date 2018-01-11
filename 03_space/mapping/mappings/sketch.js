/*
Mimi Yin NYU-ITP
Mapping techniques.
*/
var sound;
var input = 0;
var mapping = 0;
var value = 0;
var pspeed = 0;
var volume = 0;

var inputs = ["Position", "Speed", "Acceleration"];
var mappings = ["Linear", "Non-Linear", "Step", "Sawtooth", "Sin", "Noise", "Linear-Random", "Random"];

function preload() {
  sound = loadSound("data/guitar.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sound.setVolume(0);
  sound.loop();
  noiseSeed(0);
  background(0);
}

function draw() {
  // Switch the input
  var speed = abs(mouseX - pmouseX);
  var accel = abs(speed - pspeed);

  switch (input) {
    // Position
    case 0:
      value = mouseX;
      break;
      // Speed
    case 1:
      value = speed * width * 0.1;
      break;
      // Acceleration
    case 2:
      value = accel * width * 0.1;
      break;
  }

  // Store the value for next frame
  pspeed = speed;

  // Make it louder
  // Define the range of volume to be roughly (0-2);
  var scl = 2;

  // Switch how inputs are mapped to volume
  switch (mapping) {
    // Linear mapping
    case 0:
      volume = scl * value / width;
      break;
      // Non-linear mapping
    case 1:
      volume = width / (width - value) - 1;
      break;
      // Step-function
    case 2:
      var interval = width / 3;
      volume = scl * floor(value / interval);
      break;
      // Saw-tooth wave
    case 3:
      var interval = width / 3;
      volume = scl * (value % interval / interval);
      break;
      // Sine wave
    case 4:
      volume = (sin(2 * TWO_PI * value / width) * scl / 2 + scl / 2);
      break;
      // Noise
    case 5:
      if (frameCount % 2 == 0) {
        volume = noise(value * 0.01) - 0.25;
        volume = map(volume, 0, 0.5, 0, 1);
      }
      break;
      // Linear random
    case 6:
      if (frameCount % 5 == 0) {
        volume = random(scl * value / width);
      }
      break;
      // Random
    case 7:
      if (frameCount % 5 == 0) {
        volume = random(scl);
      }
      break;
  }

  volume = constrain(volume, 0, 100);
  sound.setVolume(volume);

  background(0);
  fill(255);
  noStroke();
  ellipse(mouseX, height / 2, volume * 100 + 50, volume * 100 + 50);

  textSize(12);
  text("Press RETURN to change input. Press ESC to change mapping.", 10, 20);
  textSize(18);
  text("INPUT: " + input + "\tMAPPING: " + mapping, 10, 40);
  //text("INPUT: " + input + " (" + inputs[input] + ")\tMAPPING: " + mapping + " (" + mappings[mapping] + ")", 10, 40);
}

function keyPressed() {
  switch (keyCode) {
    case ESC:
      mapping++;
      mapping %= 8;
      break;
    case RETURN:
      input++;
      input %= 3;
      break;
  }
}