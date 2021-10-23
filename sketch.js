const w = 40;
let rows, cols
let grid = []

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    let x = this.x * w
    let y = this.y * w

    rect(x, y, w);
  }
}

function setup() {
  createCanvas(600, 600)
  cols = floor(width / w)
  rows = floor(height / w)

  for(let y=0;y<cols;y++){
    for(let x=0;x<rows;x++){
      grid.push(new Cell(x, y))
    
    }
  }
}

function draw() {
  background(220);
  for(let i =0;i<grid.length;i++){
    fill(230)
    grid[i].show()
  }
}
