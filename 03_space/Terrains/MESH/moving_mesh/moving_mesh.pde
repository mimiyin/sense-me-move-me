import toxi.math.conversion.*; //<>// //<>//
import toxi.geom.*;
import toxi.math.*;
import toxi.geom.mesh2d.*;
import toxi.util.datatypes.*;
import toxi.util.events.*;
import toxi.geom.mesh.subdiv.*;
import toxi.geom.mesh.*;
import toxi.math.waves.*;
import toxi.util.*;
import toxi.math.noise.*;
import toxi.processing.*;

ToxiclibsSupport gfx;
Voronoi voronoi;

int numPoints = 20;
Vec2D [] points;
Vec2D [] speeds;

int mode = 0;
int numModes = 4;

float diag;

void setup()
{
  size( 1280, 720, P2D);

  gfx = new ToxiclibsSupport( this );
  voronoi = new Voronoi();

  diag = sqrt(sq(width) + sq(height));

  reset();

  println("TAB to change modes.");
  println("\t0: Speeds");
  println("\t1: Random speeds.");
  println("\t2: Noisy speeds.");
  println("\t3: Circular speeds.");
}

void draw()
{
  background(0);
  noFill();
  stroke(255);

  // UPDATE POINTS FOR MESH
  for ( int p = 0; p < points.length; p++ ) {
    
    // Temporary variables for location of each point and its speed.
    Vec2D point = points[p];
    Vec2D speed = new Vec2D();;

    // Scale speed of movement based on distance from mouse
    // The closer the faster
    // How would you make it the opposite?
    float scl = 0.5/(dist(point.x, point.y, mouseX, mouseY)/diag*2);

    switch(mode) {
    case 0: // Move points according to their speed
      // Bounce point @edges
      if(point.x < 0 || point.x > width) {
        speeds[p].x *= -1;
        point.x = point.x < 0 ? 5 : width-5;
      }
      if(point.y < 0 || point.y > height) {
        speeds[p].y *= -1;
        point.y = point.y < 0 ? 5 : height-5;
      }   
      speed = speeds[p];
      break;
    case 1: // Move points randomly
      speed = new Vec2D(random(-5, 5), random(-5, 5));
      break;

    case 2: // Move points with noise
      speed = new Vec2D(noise(p*frameCount*0.01)*2 - 1, noise(2*p*frameCount*0.01)*2 - 1);
      break;

    case 3: // Move points using sin()
      speed = new Vec2D(cos(p*frameCount*0.01), sin(p*frameCount*0.01));
      break;
    }
    point.addSelf(speed.scale(scl));
  }

  // CREATE VORONOI MESH
  voronoi = new Voronoi();
  for ( Vec2D point : points) {
    voronoi.addPoint( point );
  }

  // GET REGIONS OF MESH
  for ( Polygon2D polygon : voronoi.getRegions()) {
    // Check to see if mouse is inside region
    fill(polygon.containsPoint(new Vec2D(mouseX, mouseY)) ? 255 : 0);
    gfx.polygon2D( polygon );
  }

  // DRAW RED DOTS FOR VORONOI POINTS
  strokeWeight( 4 );
  stroke(255);
  for ( Vec2D v : voronoi.getSites() ) {
    point( v.x, v.y );
  }
}

// Initialize arrays for keeping track of point positions and speeds
void reset() {
  points = new Vec2D[numPoints];
  speeds = new Vec2D[points.length];

  for ( int p = 0; p < points.length; p++ ) {
    points[p] = new Vec2D(random(width), random(height));
    speeds[p] = new Vec2D(random(-1, 1), random(-1, 1));
  }
}

// Change movement modes
// Change number of points
void keyPressed() {
  switch(keyCode) {
  case TAB:
    mode++;
    mode%=numModes;
    break;
  case UP:
    numPoints++;
    break;
  case DOWN:
    numPoints--;
    break;
  }

  reset();

  // Don't allow fewer than 2 points or more than 50 points
  numPoints = constrain(numPoints, 2, 50);
  println("MODE", mode, "Number of Points", numPoints);
}