import _ from 'lodash';
import PIXI from 'pixi.js';
PIXI.utils._saidHello = true; // remove console log from PIXI.js
// Cells
const cellSize = 8;
const cellSpacing = 8;
const cellColour = 0xD74D4B;
const baseColour = 0xD04945;
const container = document.getElementById('masthead');
const renderer = PIXI.autoDetectRenderer(container.offsetWidth, container.offsetHeight, { antialias: false, transparent: false, resolution: 1 });
const stage = new PIXI.Container();

let cells = [];

const setup = function () {
  renderer.autoResize = true;
  renderer.backgroundColor = baseColour;
  container.appendChild(renderer.view);
  renderer.render(stage);
  createGrid();
  window.addEventListener('resize', update);
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

  renderer.render(stage);
}

function addCell(x, y, colour) {
  let cell = new PIXI.Graphics();
  cell.beginFill(colour);
  cell.drawRect(0, 0, cellSize, cellSize);
  cell.x = cellSpacing + (cellSpacing * x) + (cellSize * x);
  cell.y =  cellSpacing + (cellSpacing * y) + (cellSize * y);

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
