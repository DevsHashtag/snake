import { boardElement, GRID_COLUMNS, GRID_ROWS, BLOCK_SIZE, BLOCK_MARGIN, CLASS_NAMES } from './settings.js';

import { unit } from './utils/unit.js';

function Board() {
  this.element = boardElement;

  this.columns = GRID_COLUMNS;
  this.rows = GRID_ROWS;

  this.width = GRID_COLUMNS * BLOCK_SIZE;
  this.height = GRID_ROWS * BLOCK_SIZE;

  this.blockSize = BLOCK_SIZE;
  this.blockMargin = BLOCK_MARGIN;

  this.blocks = new Object();
  this.isModalOpen = false;

  this.init = function () {
    this.element.style.width = unit.pixel(this.width);
    this.element.style.height = unit.pixel(this.height);
  };

  this.setClassName = function (element, className) {
    if (typeof className == 'string') element.classList.add(className);
    else element.classList.add(...className);
  };

  this.addElement = function (className) {
    const element = document.createElement('div');

    this.setClassName(element, className);

    this.element.appendChild(element);

    return element;
  };

  this.addBlock = function (className, position) {
    const blockElement = document.createElement('div');
    const blockSize = unit.pixel(this.blockSize - this.blockMargin);

    this.moveBlock(blockElement, position);
    this.setClassName(blockElement, className);

    blockElement.style.width = blockSize;
    blockElement.style.height = blockSize;

    this.saveBlock(blockElement);
    this.element.appendChild(blockElement);

    return blockElement;
  };

  this.moveBlock = function (blockElement, position) {
    if (position.center) position = this.centerPosition();
    if (position.random) position = this.randomPosition();

    if (!position) return false;

    blockElement.style.left = unit.pixel(position.x * this.blockSize);
    blockElement.style.top = unit.pixel(position.y * this.blockSize);

    return true;
  };

  this.saveBlock = function (blockElement) {
    const className = blockElement.classList[0];

    this.blocks[className] = this.blocks[className] ?? [];
    this.blocks[className].push(blockElement);
  };

  this.removeBlock = function (rmBlock) {
    const className = rmBlock.classList[0];
    const blocks = this.blocks[className];

    // remove block from its class
    this.blocks[className] = blocks.filter((block) => !block.isSameNode(rmBlock));

    if (!this.blocks[className].length) {
      delete this.blocks[className];
    }

    this.element.removeChild(rmBlock);
  };

  this.message = function (msg, className = CLASS_NAMES.message) {
    if (this.isModalOpen) return;

    this.isModalOpen = true;

    const msgElement = this.addElement(className);

    msgElement.innerText = msg;
  };

  this.onBoard = function (pos) {
    if (!pos) return false;

    const isOutBoard = [
      pos.y < 0, // out from up
      pos.y >= this.rows, // out from down
      pos.x < 0, // out from left
      pos.x >= this.columns, // out from right
    ];

    return !isOutBoard.includes(true);
  };

  this.centerPosition = function () {
    return {
      x: this.columns / 2 - (this.columns % 2 == 0 ? 0 : 0.5),
      y: this.rows / 2 - (this.rows % 2 == 0 ? 0 : 0.5),
    };
  };

  this.randomPosition = function () {
    const freePositions = this.freePositions();

    if (!freePositions) return false;

    return freePositions[Math.floor(Math.random() * freePositions.length)];
  };

  this.freePositions = function (className = CLASS_NAMES.snake.body) {
    const blocks = this.blocks[className] ?? [];

    // return if no space is free
    if (blocks.length >= this.columns * this.rows) return false;

    // blocks position
    const blocksPosition = blocks.map((block) => unit.position(block));

    let freePositions = [];

    // find board free positions
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        if (!blocksPosition.some((pos) => pos.x == x && pos.y == y)) {
          freePositions.push({ x, y });
        }
      }
    }

    return freePositions;
  };
}

export default Board;
