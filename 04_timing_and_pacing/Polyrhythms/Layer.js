function Layer(mode, start, interval, sound, t, tspeed) {
  this.mode = mode;

  // counter variable to count frames
  // Is also used to mark the x-location
  // of the beat on the screen
  this.counter = start;
  this.prevBeat = 0;
  this.interval = interval;
  this.sound = sound;

  // Variables for wave functions and noise
  this.max = interval;
  this.t = t || 0;
  this.tspeed = tspeed || 0;

  // Variables for drawing the beat to the screen
  this.y = 0;
  this.ymin = 0;
  this.ymax = 0;
  this.w = 5;
  this.h = 10;

  // Figure out how much vertical space to give each layer
  // based on total number of layers
  this.init = function (l) {
    this.ymin = l * height / layers.length;
    this.ymax = (l + 1) * height / layers.length;
    this.y = this.ymin;
  }

  // Run the counter
  // Play the beat when it's time
  // Draw the beat to the screen
  this.run = function () {
    // If enough time has past, play a beat
    if (this.counter - this.prevBeat >= this.interval) {
      this.t += this.tspeed;
      switch (this.mode) {
        case 0:
          fill(0);
          break;
        case 1:
          this.interval = cos(this.t) * this.max / 2 + this.max / 2 + 5;
          fill(0, 0, 255);
          break;
        case 2:
          this.interval = random(10, this.max);
          fill(255, 0, 0);
          break;
        case 3:
          this.interval = noise(this.t) * this.max;
          fill(255, 153, 153);
          break;
      }
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
}