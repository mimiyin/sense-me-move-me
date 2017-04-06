int cols = 1;
int rows = 1;
float colW, rowH;
int mode = 0;

void setup() {
  size(1280, 720, P2D);
  initialize();
}

void draw() {
  background(255);

  for (float col = 0; col < cols; col++) {
    for (float row = 0; row < rows; row++) {
      float x = col*colW;
      float y = row*rowH;
     
      switch(mode) {
        // Outline
      case 0:
        stroke(0);
        noFill();
        break;
        // Checkers
      case 1:
        noStroke();
        if (col%2 == 0 && row%2 == 1 || col%2 == 1 && row%2 == 0) fill(0);
        else fill(255);
        break;
      }
      
      // Check to see where the mouse is
      //if (mouseX > x && mouseX < x+colW && mouseY > y && mouseY < y+rowH) fill(255, 0, 0);
      rect(x, y, colW, rowH);
    }
  }
}

void initialize() {
  colW = width/cols;
  rowH = height/rows;
}


void keyPressed() {
  switch(keyCode) {
  case TAB:
    mode++;
    mode%=3;
  case RIGHT:
    cols++;
    break;
  case LEFT:
    cols--;
    break; 
  case UP:
    rows++;
    break; 
  case DOWN:
    rows--;
    break;
  }

  cols = constrain(cols, 1, width);
  rows = constrain(rows, 1, height);
  initialize();
}