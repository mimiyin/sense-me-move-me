int sz = 20;
PImage img;
float counter;
float diag;
void setup() {
  size(1280, 720, P2D);
  noStroke();
  img = loadImage("texture.png");
  diag = sqrt(sq(width) + sq(height));
}

void draw() {
  for (float x = 0; x < width; x+=sz) {
    for (float y = 0; y < height; y += sz) {
      // Scale z-axis of noise field with distance from mouse
      float scl = dist(mouseX, mouseY, x, y);
      //float c = noise(x*0.01, y*0.01, scl*0.01)*255;
      float c = noise(x*0.01, y*0.01, scl*0.00001*frameCount)*255;
      tint(c);
      image(img, x, y, sz*1.5, sz*1.5);
      //fill(c);
      //rect(x, y, sz, sz);
    }
  }
}