/*
Mimi Yin NYU-ITP
Random random.
*/

var zoom;
var numCols, numRows;
var cellW, cellH;

function setup() {
  createCanvas(windowWidth, windowHeight);
  numCols = 10;
  cellW = windowWidth/numCols;
  cellH = cellW*windowHeight/windowWidth;
  numRows = windowHeight/cellH;
}


function draw() {
  background(255);
	x = floor(random(numCols));
  y = floor(random(numRows));

  if(zoom) {
    if(x == floor(numCols/2) && y == floor(numRows/2)) background(0);
  }
  else {
  	fill(0);
    rect(x*cellW, y*cellH, cellW, cellH);
  }

}

function mousePressed(){
 zoom = !zoom;
}