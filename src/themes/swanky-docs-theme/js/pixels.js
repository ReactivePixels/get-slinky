import _ from 'lodash';
import PIXI from 'pixi.js';

// Cells
const cellSize = 8;
const cellSpacing = 1;
const maxCellAlpha = 0.5;
const minCellAlpha = 0;
const cellColour = 0xF68B8F;
const baseColour = 0xFF5A60;
const container = document.getElementById('masthead');
const renderer = PIXI.autoDetectRenderer(container.offsetWidth, container.offsetHeight, { antialias: false, transparent: false, resolution: 1 });
const stage = new PIXI.Container();

let cells = [];

const setup = function () {
  renderer.autoResize = true;
  renderer.backgroundColor = 0xFF5A60;
  container.appendChild(renderer.view);
  renderer.render(stage);

  createGrid();

  loop();

  window.addEventListener('resize', update);
}

function addEvents() {
  // Mouseover alpha
  renderer.view.addEventListener('mousemove', (event) => {
    let x = Math.ceil(event.pageX / (cellSize + cellSpacing) - 1);
    let y = Math.ceil(event.pageY / (cellSize + cellSpacing) - 1);

    x = Math.max(0, x);
    y = Math.max(0, y);

    cells[x][y].alpha = 0.75;
    cells[x][y].prevAlpha = 0.75;
  });
}

function createGrid() {
  const cols = Math.ceil(container.offsetWidth / (cellSize + cellSpacing));
  const rows = Math.ceil(container.offsetHeight / (cellSize + cellSpacing));

  for (let x = 0 ; x < cols; x++) {
    cells[x] = [];
    for (let y = 0 ; y < rows; y++) {

      addCell(x, y, cellColour);
    }
  }
}

function loop() {
  requestAnimationFrame(loop);

  for (let x = 0 ; x < cells.length; x++) {
    for (let y = 0 ; y < cells[x].length; y++) {
      if(cells[x][y].alpha >= cells[x][y].prevAlpha && cells[x][y].alpha < maxCellAlpha) {

        cells[x][y].prevAlpha = cells[x][y].alpha;
        cells[x][y].alpha = Math.min(maxCellAlpha, cells[x][y].alpha + cells[x][y].speed);

      } else if (cells[x][y].alpha > minCellAlpha) {

        cells[x][y].prevAlpha = cells[x][y].alpha;
        cells[x][y].alpha = Math.max(minCellAlpha, cells[x][y].alpha - cells[x][y].speed);

      } else {
        cells[x][y].prevAlpha = cells[x][y].alpha;
        cells[x][y].alpha = Math.min(1, cells[x][y].alpha + cells[x][y].speed);
      }
    }
  }

  renderer.render(stage);
}

function addCell(x, y, colour) {
  let cell = new PIXI.Graphics();
  cell.beginFill(colour);
  cell.drawRect(0, 0, cellSize, cellSize);
  cell.x = cellSpacing + (cellSpacing * x) + (cellSize * x);
  cell.y =  cellSpacing + (cellSpacing * y) + (cellSize * y);

  cell.alpha = (Math.random() * maxCellAlpha) + minCellAlpha;
  cell.speed = Math.random() * 0.02;
  cell.prevAlpha = cell.alpha +  (Math.random() < 0.5 ? -0.0001 : 0.0001);
  cell.endFill();

  cells[x][y] = cell;

  stage.addChild(cell);
}

let update = _.debounce(() => {
  renderer.resize(container.offsetWidth, container.offsetHeight)
  stage.removeChildren();
  cells = [];
  createGrid();
}, 10);

module.exports = setup;
