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
Voronoi voronoi;


// Mapping Kinect data to projection
float xshift, yshift;
float xscl, yscl;
boolean scl;

void setup() {
  size(1024, 768);

  kinect = new KinectPV2(this);

  kinect.enableColorImg(true);

  //enable 3d  with (x,y,z) position
  kinect.enableSkeleton3DMap(true);

  kinect.init();

  // Voronoi
  gfx = new ToxiclibsSupport( this );

  // Parameters for mapping Kinect data to projection
  xscl = width/3.2*0.55;
  yscl = -width/3.2*0.6;
  xshift = 0;
  yshift = height/2;

  println("Use TAB to switch modes.");
}

void draw() {
  background(0);

  //translate the scene to the center 

  ArrayList<KSkeleton> skeletons =  kinect.getSkeleton3d();
  Voronoi voronoi = new Voronoi();

  //individual JOINTS
  for (KSkeleton skeleton : skeletons) {
    if (skeleton.isTracked()) {
      KJoint[] joints = skeleton.getJoints();

      // Only use head to seed Voronoi
      PVector pos = getPos(joints[KinectPV2.JointType_Head]);
      voronoi.addPoint( new Vec2D( pos.x, pos.y ) );
    }

    // DRAW RED DOTS FOR VORONOI POINTS
    strokeWeight( 4 );
    stroke(255);
    for ( Vec2D s : voronoi.getSites() ) {
      point( s.x, s.y );
    }
    
    // DRAW REGIONS
    strokeWeight( 0.01 );
    stroke( 255 );
    noFill();
    for ( Polygon2D polygon : voronoi.getRegions() ) {
      gfx.polygon2D( polygon );
    }
  }
}

// Scale Kinect data to projection
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