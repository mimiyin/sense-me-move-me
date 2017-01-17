var NoiseLayer = function(start, interval, sound, t, tspeed) {
  // Pass parameters to parent's constructor.
  Layer.call(this, start, interval, sound);

  // Maximum beat length
  this.max = interval;
  // Where we are in the noise function
  this.t = t || 0;
  // How fast we're moving through the noise function
  this.tspeed = tspeed || 0;


  this.calc = function(){
    this.t += this.tspeed;
    this.interval = noise(this.t) * this.max;
  }
}

NoiseLayer.prototype = Object.create(Layer.prototype);
NoiseLayer.constructor = Layer.constructor;