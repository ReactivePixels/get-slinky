import _ from 'lodash';
const PIXI = require('pixi.js');
PIXI.utils.skipHello(); // remove console log from PIXI.js
// Cells
const cellSize = 8;
const cellSpacing = 8;
const cellColour = 0x323232;
const highlightColours = [0xF89600, 0xB7F900, 0xF6D200, 0x00E0E9];
const baseColour = 0x000000;
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
      const randomiser = Math.ceil(Math.random() * 60);

      const borderColour = (randomiser === 60) ? highlightColours[Math.floor(Math.random() * highlightColours.length)] : cellColour;
      addCell(x, y, borderColour);
    }
  }

  renderer.render(stage);
}

function addCell(x, y, borderColour) {
  let cell = new PIXI.Graphics();
  // cell.beginFill(borderColour);
  cell.lineStyle(1, borderColour);
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

update();

module.exports = setup;
