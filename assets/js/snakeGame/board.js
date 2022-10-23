import { boardElement, GRID_COLUMNS, GRID_ROWS, GRID_BLOCK, BLOCK_CLASS } from './settings.js';

import { unit } from './utils/unit.js';

function Board() {
  this.element = boardElement;

  this.columns = GRID_COLUMNS;
  this.rows = GRID_ROWS;

  this.width = GRID_COLUMNS * GRID_BLOCK;
  this.height = GRID_ROWS * GRID_BLOCK;

  this.blocks = {};

  this.block = {
    board: this,

    size: GRID_BLOCK,

    add: function (className, position, isBlock = true) {
      const block = document.createElement('div');
      const blockSize = unit.px(this.size);

      // convert className to Array
      className = typeof className == 'string' ? [className] : className;

      block.classList.add(...className);

      if (position) {
        this.move(block, position);
      }

      if (isBlock) {
        block.style.width = blockSize;
        block.style.height = blockSize;
      }

      this.board.element.appendChild(block);

      if (!this.board.blocks[className[0]]) {
        this.board.blocks[className[0]] = [block];
      } else {
        this.board.blocks[className[0]].push(block);
      }

      return block;
    },

    remove: function (rmBlock) {
      const blockClass = rmBlock.classList[0];
      const boardBlocks = this.board.blocks[blockClass];

      this.board.blocks[blockClass] = boardBlocks.filter((block) => !block.isSameNode(rmBlock));

      if (!this.board.blocks[blockClass].length) delete this.board.blocks[blockClass];

      this.board.element.removeChild(rmBlock);

      return true;
    },

    move: function (block, position) {
      if (position.center) position = this.board.centerPosition();
      if (position.random) position = this.board.randomPosition();

      if (!position || !this.board.onBoard(position)) return false;

      block.style.left = unit.px(position.x);
      block.style.top = unit.px(position.y);

      return true;
    },

    modalMessage: function (msg, type) {
      let msgElement = this.add(type, null, false);

      msgElement.innerText = msg;
    },
  };

  this.init = function () {
    this.element.style.width = unit.px(this.width);
    this.element.style.height = unit.px(this.height);
  };

  this.onBoard = function (pos) {
    if (!pos) return false;

    let isOutBoard = [
      pos.y < 0, // out from up
      pos.y >= this.height, // out from down
      pos.x < 0, // out from left
      pos.x >= this.width, // out from right
    ];

    return !isOutBoard.includes(true);
  };

  this.randomPosition = function () {
    const freePositions = this.freePositions();

    if (!freePositions) return false;

    return freePositions[Math.floor(Math.random() * freePositions.length)];
  };

  this.centerPosition = function () {
    return {
      x: this.width / 2 - (this.columns % 2 == 0 ? 0 : this.block.size / 2),
      y: this.height / 2 - (this.rows % 2 == 0 ? 0 : this.block.size / 2),
    };
  };

  this.freePositions = function () {
    const blocks = this.blocks[BLOCK_CLASS.snake.body];

    // return if no space is free
    if (blocks.length >= this.columns * this.rows) return false;

    // blocks position
    const blocksPosition = blocks.map((block) => unit.block(block));
    const blockSize = this.block.size;

    let freePositions = [];

    // find board free positions
    for (let y = 0; y < this.height; y += blockSize) {
      for (let x = 0; x < this.width; x += blockSize) {
        if (!blocksPosition.some((pos) => pos.x == x && pos.y == y)) {
          freePositions.push({ x, y });
        }
      }
    }

    return freePositions;
  };
}

export default Board;
