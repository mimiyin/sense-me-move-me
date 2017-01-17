var RandomLayer = function(start, interval, sound) {
  // Pass parameters to parent's constructor.
  Layer.call(this, start, interval, sound);

  // Maximum beat length
  this.max = interval;

  this.calc = function(){
    this.t += this.tspeed;
    this.interval = random(this.max);
  }
}

RandomLayer.prototype = Object.create(Layer.prototype);
RandomLayer.constructor = Layer.constructor;