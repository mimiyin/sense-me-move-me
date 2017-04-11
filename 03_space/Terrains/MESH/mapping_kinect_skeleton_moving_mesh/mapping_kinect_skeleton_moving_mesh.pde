/*
 Mimi Yin NYU-ITP
 Thomas Sanchez Lengeling.
 http://codigogenerativo.com/
 
 KinectPV2, Kinect for Windows v2 library for processing
 
 3D Skeleton.
 Some features a not implemented, such as orientation
 */

import KinectPV2.KJoint;
import KinectPV2.*;

KinectPV2 kinect;


import toxi.math.conversion.*;
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

// Data to create moving mesh
int numPoints = 20;
Vec2D [] points;
Vec2D [] speeds;
float diag;

// Mapping Kinect data to projection
float xshift, yshift;
float xscl, yscl;
boolean scl;

void setup() {
  size(1280, 800, P2D);

  kinect = new KinectPV2(this);

  kinect.enableColorImg(true);

  //enable 3d  with (x,y,z) position
  kinect.enableSkeleton3DMap(true);

  kinect.init();

  // Voronoi
  gfx = new ToxiclibsSupport( this );

  points = new Vec2D[numPoints];
  speeds = new Vec2D[points.length];

  for ( int p = 0; p < points.length; p++ ) {
    points[p] = new Vec2D(random(width), random(height));
    speeds[p] = new Vec2D(random(-1, 1), random(-1, 1));
  }

  // Calculate diag of window
  diag = sqrt(sq(width) + sq(height));

  // Parameters for mapping Kinect data to projection
  xscl = width/3.2*0.55;
  yscl = -width/3.2*0.6;
  xshift = 0;
  yshift = height/2;

  println("Use TAB to switch mode of arrow keys.");
}

void draw() {
  background(0);

  //translate the scene to the center 

  ArrayList<KSkeleton> skeletons =  kinect.getSkeleton3d();
  // Scale speed of movement based on distance from mouse
  // The closer the faster
  // How would you make it the opposite?
  PVector avgPos = new PVector(0, 0);

  //Get positions for each skeleton
  for (KSkeleton skeleton : skeletons) {
    if (skeleton.isTracked()) {
      KJoint[] joints = skeleton.getJoints();

      // Only use head to seed Voronoi
      PVector pos = getPos(joints[KinectPV2.JointType_Head]);
      avgPos.add(pos);
    }
  }
  if (skeletons.size() > 0) {
    // Average position of all the skeletons
    avgPos.div(skeletons.size());
  }

  // UPDATE POINTS FOR MESH
  for ( int p = 0; p < points.length; p++ ) {
    // Temporary variables for location of each point and its speed.
    Vec2D point = points[p];
    Vec2D speed = speeds[p];

    // Avg position affects mesh
    float mult = 0.5 / (dist(avgPos.x, avgPos.y, point.x, point.y) / diag*2);

    // Bounce point @edges
    if (point.x < 0 || point.x > width) {
      speed.x *= -1;
      point.x = point.x < 0 ? 5 : width-5;
    }
    if (point.y < 0 || point.y > height) {
      speed.y *= -1;
      point.y = point.y < 0 ? 5 : height-5;
    }   

    point.addSelf(speed.scale(mult));
  }

  // CREATE VORONOI MESH
  Voronoi voronoi = new Voronoi();
  for ( Vec2D point : points ) {
    voronoi.addPoint( point );
  }

  // GET REGIONS OF MESH
  for ( Polygon2D polygon : voronoi.getRegions()) {
    // Check to see if mouse is inside region
    fill(polygon.containsPoint(new Vec2D(avgPos.x, avgPos.y)) ? 255 : 0);
    gfx.polygon2D( polygon );
  }

  // DRAW RED DOTS FOR VORONOI POINTS
  strokeWeight( 4 );
  stroke(255);
  for ( Vec2D v : voronoi.getSites() ) {
    point( v.x, v.y );
  }
}

PVector getPos(KJoint joint) {
  return new PVector(joint.getZ()*xscl + xshift, joint.getX()*yscl + yshift);
}


void keyPressed() {
  // Press TAB to switch between adjust scl v. shift
  if (keyCode == TAB) scl = !scl;

  // Adjust scale of x,z coordinates to map to projection
  if (scl) {
    switch(keyCode) {
    case RIGHT:
      xscl++;
      break;
    case LEFT:
      xscl--;
      break;
    case UP:
      yscl++;
      break;
    case DOWN:
      yscl--;
      break;
    }

    xscl = constrain(xscl, 0, width);
    yscl = constrain(yscl, 0, width);
  }
  // Adjust shift
  else {
    switch(keyCode) {
    case RIGHT:
      xshift++;
      break;
    case LEFT:
      xshift--;
      break;
    case UP:
      yshift++;
      break;
    case DOWN:
      yshift--;
      break;
    }
    xshift = constrain(xshift, 0, width);
    yshift = constrain(yshift, 0, height);
  }
}