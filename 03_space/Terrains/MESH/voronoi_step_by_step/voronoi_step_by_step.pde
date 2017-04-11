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

import java.util.*;

ToxiclibsSupport gfx;
Voronoi voronoi;
ArrayList<Vec2D> points = new ArrayList<Vec2D>();


void setup()
{
  size( 1280, 720, P2D);

  gfx = new ToxiclibsSupport( this );
  voronoi = new Voronoi();

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



  // CREATE VORONOI MESH
  voronoi = new Voronoi();
  for ( Vec2D point : points) {
    voronoi.addPoint( point );
  }

  // GET REGIONS OF MESH
  for ( Polygon2D polygon : voronoi.getRegions()) {
    // Check to see if mouse is inside region
    fill(0);
    gfx.polygon2D( polygon );
  }

  // DRAW RED DOTS FOR VORONOI POINTS
  List<Vec2D> sites = voronoi.getSites();
  for (int s = 0; s < sites.size(); s++) {
    Vec2D site = sites.get(s);
    for (int o = 0; o < sites.size(); o++) {
      Vec2D osite = sites.get(o);
      stroke(255);
      strokeWeight(1);
      line(site.x, site.y, osite.x, osite.y);
    }
    stroke(255, 0, 0);
    strokeWeight(10);
    point( site.x, site.y );
  }
}



void mousePressed() {
  points.add(new Vec2D(mouseX, mouseY));
}