// Object for managing bodies
// Adds, updates and removes, maintains pop count
var BodyManager = function(){
  var pop = 0; // How many bodies?
  var bodies = {}; // Bodies indexed by id

  // Remove dead bodies
  // Any bodies that haven't been updated for 5 seconds.
  var removeDeadBodies = function() {
    var ts = Date.now();
    for(var id in bodies) {
      var body = bodies[id];
      if(body.isDead()) {
        delete bodies[id];
        pop--;
      }
    }
  }

  // Set recurring task to remove dead bodies
  setInterval(removeDeadBodies, DEATH_TH);

  // Check to see if body already exists
  this.contains = function(id) {
    return id in bodies;
  }
  // Add new body
  this.add = function(body) {
    var id = body.trackingId;
    bodies[id] = new Body(body);
    pop++;
  }
  // Update data for existing body
  this.update = function(body) {
    var id = body.trackingId;
    bodies[id].update(body);
  }

  // Returns array of body objects
  this.getBodies = function() {
    var arrayOfBodies = [];
    for(id in bodies) {
      arrayOfBodies.push(bodies[id]);
    }
    return arrayOfBodies;
  }

  // Returns array of joint objects
  // for the specified joint
  // Includes pos, speed and acceleration for each joint
  this.getJoints = function(joint) {
    var joints = [];
    for(id in bodies) {
      var body = bodies[id];
      joints.push(body.getJoint(joint));
    }
    return joints;
  }
  // Returns an array of position vector
  // for the specified joint
  this.getPositions = function(joint) {
    var positions = [];
    for(id in bodies) {
      var body = bodies[id];
      positions.push(body.getPosition(joint));
    }
    return positions;
  }

  // Returns current population of bodies
  this.getPop = function() {
    return pop;
  }
};