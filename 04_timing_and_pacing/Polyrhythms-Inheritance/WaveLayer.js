var WaveLayer = function(start, interval, sound, t, tspeed) {
  // Pass parameters to parent's constructor.
  Layer.call(this, start, interval, sound);

  // Maximum beat length
  this.max = interval;
  // Where we are in the wave function
  this.t = t || 0;
  // How fast we're moving through the wave function
  this.tspeed = tspeed || 0;

  this.calc = function(){
    this.t += this.tspeed;
    this.interval = cos(this.t) * this.max / 2 + this.max / 2 + 5;
  }
}

WaveLayer.prototype = Object.create(Layer.prototype);
WaveLayer.constructor = Layer.constructor;