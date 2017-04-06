int sz = 20;
PImage text;
float counter;
float diag;
void setup() {
  size(1280, 720, P2D);
  noStroke();
  text = loadImage("texture.png");
  diag = sqrt(sq(width) + sq(height));
}

void draw() {
  for (float x = 0; x < width; x+=sz) {
    for (float y = 0; y < height; y += sz) {
      // Scale z-axis of noise field with distance from mouse
      float scl = dist(mouseX, mouseY, x, y)/diag;
      //float c = noise(x*0.01, y*0.01, scl*0.01)*255;
      float r = noise(x*0.01, y*0.01, scl*0.01*frameCount)*255;
      float g = noise(x*0.01, y*0.01, scl*0.02*frameCount)*255;
      float b = noise(x*0.01, y*0.01, scl*0.03*frameCount)*255;
      
      tint(r,g,b);
      image(text, x, y, sz*5, sz*5);
      //fill(c);
      //rect(x, y, sz, sz);
    }
  }
}