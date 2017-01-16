/* Mimi Yin, NYU-ITP
Simply Polyrhythm Builder
*/

var sounds = [];
var layers = [];

 function preload() {
    for(var s=0; s < 14; s++) {
     var file = 'sounds/' + s + '.mp3';
        sounds.push(loadSound(file)); 
    } 
 }

function setup() { 
    createCanvas(windowWidth, windowHeight);
    background(255);

    frameRate(30);
  
    // Parameters Layer expects are:
    // Start value for counter
    // # of frames to count between beats
    // Sound file to play
    layers.push(new Layer(0, 30, sounds[3]));
    layers.push(new Layer(0, 60, sounds[4]));

    layers.push(new Layer(0, 72, sounds[5]));
    layers.push(new Layer(0, 57, sounds[7]));
    layers.push(new Layer(0, 108, sounds[6]));

    // Initialize all the layers now that we know how many there are.
    for(var l = 0; l < layers.length; l++) {
        layers[l].init(l);
    }
}

function draw() {
    // Run layers
    for (var l = 0; l < layers.length; l++) {
        layers[l].run();
    }
} 