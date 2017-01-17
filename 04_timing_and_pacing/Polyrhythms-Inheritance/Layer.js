var Layer = function(start, interval, sound) {
  // counter variable to count frames
  // Is also used to mark the x-location
  // of the beat on the screen
  this.counter = start;
  this.prevBeat = 0;
  this.interval = interval;
  this.sound = sound;

  // Variables for drawing the beat to the screen
  this.y = 0;
  this.ymin = 0;
  this.ymax = 0;
  this.w = 5;
  this.h = 10;

  // Figure out how much vertical space to give each layer
  // based on total number of layers
  Layer.prototype.init = function (l) {
    this.ymin = l * height / layers.length;
    this.ymax = (l + 1) * height / layers.length;
    this.y = this.ymin;
  }

  // Run the counter
  // Play the beat when it's time
  // Draw the beat to the screen
  Layer.prototype.run = function () {
    // If enough time has past, play a beat
    if (this.counter - this.prevBeat >= this.interval) {
      // Calculate the next interval value;
      this.calc();

      // Remember when this beat happened.
      this.prevBeat = this.counter;
      // Play the beat.
      this.sound.play();

      // Draw a rect to visualize the beat.
      noStroke();
      fill(0);
      rect(this.counter, this.y, this.w, this.h);
    }

    // Advance the counter
    this.counter++;

    // Wrap around horizontally
    if (this.counter > width) {
      this.counter %= width;
      this.prevBeat -= width;
      this.y += this.h;
    }

    // Start over when we reach the bottom of the screen
    if (this.y > this.ymax) {
      background(255);
      this.counter = 0;
      this.y = this.ymin;
    }
  }

  Layer.prototype.calc = function() {
    // interval doesn't change
  }
}

