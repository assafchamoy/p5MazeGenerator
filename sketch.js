const w = 40;
let rows, cols
let grid = []

const TOP_WALL = 0
const RIGHT_WALL = 1
const BOTTOM_WALL = 2
const LEFT_WALL = 3

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.walls=[true, true, true,true]
    this.isCurrent = false
  }

  show() {
    let x = this.x * w
    let y = this.y * w

    //DRAW LINES INSTEAD OF RECT FOR LATER USE FOR PATH DRAWING
    //TOP line: x, y -> x+w, y
    //RIGHT line: x+w, y -> x+w, y+w
    //BOTTOM line: x, y+w -> x+w, y+w
    //LEFT line: x, y -> x, y+w


      if(this.walls[TOP_WALL])
        line(x,y,x+w,y)
      if(this.walls[RIGHT_WALL])
        line(x+w,y,x+w,y+w)
      if(this.walls[BOTTOM_WALL])
        line(x,y+w,x+w,y+w)
      if(this.walls[LEFT_WALL])
         line(x,y,x,y+w)



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
    grid[i].show()
  }
}
