import { COLUMN_LINES, ROW_LINES, BLOCK_SIZE, BLOCK_MARGIN, CLASS_NAMES } from './settings.js';
import { dom } from './app.js';

function Board() {
  this.columns = COLUMN_LINES;
  this.rows = ROW_LINES;

  this.blocks = [];

  this.block = {
    size: BLOCK_SIZE,
    margin: BLOCK_MARGIN,
  };

  this.width = this.columns * this.block.size;
  this.height = this.rows * this.block.size;

  this.isMessageOpen = false;

  this.init = function () {
    this.boardElement = dom.renderElement(CLASS_NAMES.board, dom.containerElement);
    dom.setSize(this.boardElement, { width: this.width, height: this.height });
  };

  this.addBlock = function (className, position) {
    const size = this.block.size - this.block.margin;

    let blockElement = dom.addElement(className);

    dom.setSize(blockElement, { width: size, height: size });
    this.moveBlock(blockElement, position);
    this.saveBlock(blockElement);

    this.boardElement.appendChild(blockElement);

    return blockElement;
  };

  this.moveBlock = function (element, position) {
    if (position.center) position = this.centerPosition();
    if (position.random) position = this.randomPosition();

    if (!position) return false;

    position.x *= this.block.size;
    position.y *= this.block.size;

    return dom.setPosition(element, position);
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

  this.blockPosition = function (block) {
    return {
      x: parseInt(block.style.left) / this.block.size,
      y: parseInt(block.style.top) / this.block.size,
    };
  };

  this.renderMessage = function (msg, className = CLASS_NAMES.message) {
    if (this.isMessageOpen) return;

    this.isMessageOpen = true;

    const msgElement = dom.addElement(className);

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

  this.centerPosition = function () {
    return {
      x: this.columns / 2 - (this.columns % 2 == 0 ? 0 : 0.5),
      y: this.rows / 2 - (this.rows % 2 == 0 ? 0 : 0.5),
    };
  };

  this.randomPosition = function () {
    const freePositions = this.freePositions();

    if (!freePositions) return;

    return freePositions[Math.floor(Math.random() * freePositions.length)];
  };

  this.freePositions = function (className = CLASS_NAMES.snake.body) {
    const blocks = this.blocks[className] ?? [];

    // return if no space is free
    if (blocks.length >= this.columns * this.rows) return false;

    // blocks position
    const blocksPosition = blocks.map((block) => this.blockPosition(block));

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
