int sz = 3;
float diag;
PImage img;

void setup() {
  size(1280, 720, P2D);
  noStroke();
  diag = sqrt(sq(width) + sq(height));
  img = loadImage("texture.png");
}

void draw() {
  float speed = dist(mouseX, mouseY, pmouseX, pmouseY);
  for (float x = 0; x < width; x+=sz) {
    for (float y = 0; y < height; y += sz) {
      //float d = dist(x, y, mouseX, mouseY);
      //float nd = d/diag;
      //float c = 255*nd;
      //float c = 255*dist(x, y, mouseX, mouseY)/diag*2;
      float c = 255*dist(x, y, mouseX, mouseY)/speed;
      tint(255-c);
      image(img, x, y, sz*2, sz*2);
      //fill(c);
      //rect(x, y, sz, sz);
    }
  }
}