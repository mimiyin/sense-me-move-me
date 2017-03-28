// Joint object
var Joint = function (id, joint) {
  // Create joint with id and position data
  this.id = id;
  this.pos = createVector(joint.cameraX, joint.cameraY, joint.cameraZ);
  this.ppos = this.pos.copy();
  this.speed = 0;
  this.pspeed = 0;
  this.acceleration = 0;

  // Update joint position, speed and acceleration data
  this.update = function (joint) {
    // Store current values as previous values
    this.ppos = this.pos.copy();
    this.pspeed = this.speed;

    // Update joint with new values for pos, speed and acceleration
    this.pos = createVector(joint.cameraX, joint.cameraY, joint.cameraZ);
    this.speed = p5.Vector.dist(this.pos, this.ppos);
    this.acceleration = abs(this.speed - this.pspeed);
  }
}