import { rootElement, GRID_COLUMNS, GRID_ROWS, BLOCK_SIZE, BLOCK_MARGIN, CLASS_NAMES } from './settings.js';

import { unit } from './utils/unit.js';

function Board() {
  this.rootElement = rootElement;

  this.columns = GRID_COLUMNS;
  this.rows = GRID_ROWS;

  this.width = GRID_COLUMNS * BLOCK_SIZE;
  this.height = GRID_ROWS * BLOCK_SIZE;

  this.blockSize = BLOCK_SIZE;
  this.blockMargin = BLOCK_MARGIN;

  this.blocks = [];
  this.isMessageOpen = false;

  this.init = function () {
    this.boardElement = this.addElement(CLASS_NAMES.board, 'section');
    this.setSize(this.boardElement, { width: this.width, height: this.height });
    this.rootElement.appendChild(this.boardElement);

    this.statusElement = this.renderStatus();
  };

  this.setSize = function (element, { width, height } = {}) {
    if (!width || !height) return false;

    element.style.width = unit.pixel(width);
    element.style.height = unit.pixel(height);

    return true;
  };

  this.setPosition = function (element, position) {
    if (!position) return false;

    element.style.left = unit.pixel(position.x * this.blockSize);
    element.style.top = unit.pixel(position.y * this.blockSize);

    return true;
  };

  this.addElement = function (className, type = 'div') {
    const element = document.createElement(type);

    // set className
    if (typeof className == 'string') element.classList.add(className);
    else element.classList.add(...className);

    return element;
  };

  this.addBlock = function (className, position) {
    const blockSize = this.blockSize - this.blockMargin;

    let blockElement = this.addElement(className);

    this.setSize(blockElement, { width: blockSize, height: blockSize });
    this.moveBlock(blockElement, position);
    this.saveBlock(blockElement);

    this.boardElement.appendChild(blockElement);

    return blockElement;
  };

  this.moveBlock = function (element, position) {
    if (position.center) position = this.positionCenter();
    if (position.random) position = this.positionRandom();

    return this.setPosition(element, position);
  };

  this.saveBlock = function (element) {
    const className = element.classList[0];

    this.blocks[className] = this.blocks[className] ?? [];
    this.blocks[className].push(element);
  };

  this.removeBlock = function (rmBlock) {
    const className = rmBlock.classList[0];
    const blocks = this.blocks[className];

    // remove block from its class
    this.blocks[className] = blocks.filter((block) => !block.isSameNode(rmBlock));

    if (!this.blocks[className].length) {
      delete this.blocks[className];
    }

    this.boardElement.removeChild(rmBlock);
  };

  this.renderMessage = function (msg, className = CLASS_NAMES.message) {
    if (this.isMessageOpen) return;

    this.isMessageOpen = true;

    const msgElement = this.addElement(className);

    msgElement.innerText = msg;

    this.boardElement.appendChild(msgElement);

    return msgElement;
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

  this.positionCenter = function () {
    return {
      x: this.columns / 2 - (this.columns % 2 == 0 ? 0 : 0.5),
      y: this.rows / 2 - (this.rows % 2 == 0 ? 0 : 0.5),
    };
  };

  this.positionRandom = function () {
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
