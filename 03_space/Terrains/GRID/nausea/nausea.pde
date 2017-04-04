/**
 * Mimi Yin NYU-ITP
 * Blur and distort image with mouse
 */

PImage img, text;
float cols, rows;
float colW, rowH;
float diag;

void setup() {
  size(1280, 720, P2D);
  colW = 20;
  rowH = 20;
  cols = width/colW;
  rows = height/rowH;
  diag = sqrt(sq(width) + sq(height));
  //img = loadImage("moonwalk.jpg");
  img = loadImage("mondrian.jpg");
  // Resize the image to fit the screen
  img.resize(width, img.height*width/img.width);
  
  // Load texture image to make it draw faster.
  text = loadImage("texture.png");
}

void draw() { 
  //background(255);
  for (int col = 0; col < cols; col++) {
    for (int row = 0; row < rows; row++) {
      int x = int(col*colW);
      int y = int(row*rowH);
      float sz = 250*dist(x,y, mouseX, mouseY)/diag;
      color c = img.get(x, y);
      tint(c, 128);
      image(text, x, y, sz, sz);
    }
  }
}