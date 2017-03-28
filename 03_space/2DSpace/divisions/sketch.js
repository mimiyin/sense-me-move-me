var cols = 0;
var rows = 0;
var colW, rowH;
var invert = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  init();
  noStroke();
}

function draw() {
  background(0);

  // Draw the cells
  for (var col = 0; col < cols; col++) {
    for (var row = 0; row < rows; row++) {
      if ((col % 2 == 0 && row % 2 == 1) || (col % 2 == 1 && row % 2 == 0)) fill(invert ? 255 : 0);
      else fill(invert ? 0 : 255);

      // Calculate x,y location of each cell
      var x = col * colW;
      var y = row * rowH;
      rect(x, y, colW, rowH);
    }
  }
}

// Set column width and row height based on num of cols and rows.
function init() {
  colW = width / cols;
  rowH = height / rows;
}

function keyPressed() {
  // Adjust number of columns and rows
  // ESC inverts black and white
  switch (keyCode) {
    case ESCAPE:
      invert = !invert;
      break;
    case RIGHT_ARROW:
      cols++;
      break;
    case LEFT_ARROW:
      cols--;
      break;
    case UP_ARROW:
      rows++;
      break;
    case DOWN_ARROW:
      rows--;
      break;
  }

  // Limit cols/rows to 0-10
  cols = constrain(cols, 0, 10);
  rows = constrain(rows, 0, 10);

  // Re-initialize colW and rowH
  init();

}