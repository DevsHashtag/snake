import { boardElement, GRID_COLUMNS, GRID_ROWS, BLOCK_SIZE, BLOCK_MARGIN, BLOCK_CLASS } from './settings.js';

import { unit } from './utils/unit.js';
import { dom } from './app.js';

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
    dom.setSize(this.element, { width: this.width, height: this.height });
  };

  this.addBlock = function (className, position) {
    const size = this.blockSize - this.blockMargin;
    const blockElement = dom.addElement(className, { width: size, height: size });

    this.moveBlock(blockElement, position);
    this.saveBlock(blockElement);

    return blockElement;
  };

  this.moveBlock = function (blockElement, position) {
    if (position.center) position = this.centerPosition();
    if (position.random) position = this.randomPosition();

    if (!position) return false;

    dom.setStyles(blockElement, {
      left: position.x * this.blockSize,
      top: position.y * this.blockSize,
    });

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
      delete this.board.blocks[className];
    }

    dom.removeElement(rmBlock);
  };

  this.message = function (msg, className = BLOCK_CLASS.message) {
    if (this.isModalOpen) return;

    this.isModalOpen = true;

    let msgElement = dom.addElement(className);
    msgElement.innerText = msg;
  };

  this.onBoard = function (pos) {
    if (!pos) return false;

    let isOutBoard = [
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

  this.freePositions = function (className = BLOCK_CLASS.snake.body) {
    const blocks = this.blocks[className] ?? [];

    // return if no space is free
    if (blocks.length >= this.columns * this.rows) return false;

    // blocks position
    const blocksPosition = blocks.map((block) => unit.block(block));

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
