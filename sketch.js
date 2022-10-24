const w = 20;
let rows,
  cols,
  grid = [],
  current,
  stack = [];

const TOP_WALL = 0;
const RIGHT_WALL = 1;
const BOTTOM_WALL = 2;
const LEFT_WALL = 3;

const PERCENTAGE_PLACEHOLDER = '{PERCENTAGE}';
let percentageView;

class Cell {
  constructor(x, y, isCurrent = false) {
    this.x = x;
    this.y = y;
    this.walls = [true, true, true, true];
    this.isCurrent = isCurrent;
    this.isVisited = false;
  }

  show = () => {
    let x = this.x * w;
    let y = this.y * w;

    //DRAW LINES INSTEAD OF RECT FOR LATER USE TO DRAW THE PATH.
    //TOP line: x, y -> x+w, y
    //RIGHT line: x+w, y -> x+w, y+w
    //BOTTOM line: x, y+w -> x+w, y+w
    //LEFT line: x, y -> x, y+w
    stroke(0);
    strokeWeight(1);
    if (this.walls[TOP_WALL]) line(x, y, x + w, y);
    if (this.walls[RIGHT_WALL]) line(x + w, y, x + w, y + w);
    if (this.walls[BOTTOM_WALL]) line(x, y + w, x + w, y + w);
    if (this.walls[LEFT_WALL]) line(x, y, x, y + w);

    if (this.isCurrent) {
      this.isVisited = true;
      noStroke();
      fill(6, 255, 255);
      rect(x, y, w);
    }
  };

  checkNeighbors = (cellsGrid) => {
    const { x, y } = this;
    let optinalNeighbors = [
      index(x, y - 1), // top
      index(x + 1, y), // right
      index(x, y + 1), // bottom
      index(x - 1, y), // left
    ].filter((n) => cellsGrid[n] && !cellsGrid[n].isVisited);

    return cellsGrid[random(optinalNeighbors)];
  };
}

const removeWalls = (destination) => {
  switch (true) {
    case destination.x - current.x === 1:
      // Going Right
      current.walls[RIGHT_WALL] = false;
      destination.walls[LEFT_WALL] = false;

      break;

    case destination.x - current.x === -1:
      // Going Left
      current.walls[LEFT_WALL] = false;
      destination.walls[RIGHT_WALL] = false;

      break;

    case destination.y - current.y === 1:
      //Going down
      current.walls[BOTTOM_WALL] = false;
      destination.walls[TOP_WALL] = false;

      break;
    case destination.y - current.y === -1:
      //Going up
      current.walls[TOP_WALL] = false;
      destination.walls[BOTTOM_WALL] = false;

      break;

    default:
    // Noop
  }
};

const index = (x, y) => {
  if (x < 0 || y < 0 || x > rows - 1 || y > cols - 1) return -1;
  return x + y * cols;
};

function setup() {
  percentageView = document.querySelector('.percentageView');

  createCanvas(600, 600);
  cols = floor(width / w);
  rows = floor(height / w);

  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      grid.push(new Cell(x, y));
    }
  }
  current = grid[0];
}

function draw() {
  const visitedCellsNumber = grid.filter(cell => cell.isVisited).length;
  const completePercentage = Math.floor((visitedCellsNumber / grid.length) * 100);
  percentageView.innerText = `${completePercentage}%`;

  background(220);

  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  if (current) {
    const nextVisit = current.checkNeighbors(grid);
    current.isCurrent = true;
  
    if (nextVisit) {
      nextVisit.isCurrent = true;
      removeWalls(nextVisit);
      current = nextVisit;
      stack.push(current);
    } else {
      current = stack.pop();
    }
  }
}
