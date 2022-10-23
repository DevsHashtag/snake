import { SNAKE_LENGTH, SNAKE_POSITION, SNAKE_DIRECTION, SNAKE_KEYS, BLOCK_CLASS } from './settings.js';

import { unit } from './utils/unit.js';
import { board, apple } from './app.js';

function Snake() {
  this.blocks = [];
  this.newSegments = SNAKE_LENGTH;
  this.direction = SNAKE_DIRECTION;
  this.classBody = BLOCK_CLASS.snake.body;
  this.classHead = BLOCK_CLASS.snake.head;
  this.keys = SNAKE_KEYS;

  this.isWin = false;
  this.isDead = false;

  this.init = function () {
    this.addSegment(SNAKE_POSITION);
  };

  this.render = function () {
    const isMoved = this.move();

    if (!isMoved) return;

    this.checkApple();
    this.checkWin();
  };

  this.headPosition = function () {
    return unit.block(this.blocks[0]);
  };

  this.addSegment = function (position) {
    let block;

    if (position) {
      block = board.block.add([this.classBody, this.classHead], position);
    } else {
      const tailPosition = unit.block(this.blocks.slice(-1)[0]);
      block = board.block.add(this.classBody, tailPosition);
    }

    this.blocks.push(block);
  };

  this.onSnake = function (position) {
    return this.blocks.some((block) => {
      let blockPosition = unit.block(block);

      return unit.isEqual(blockPosition, position);
    });
  };

  this.move = function () {
    if (!this.blocks.length) return false;

    const blockSize = board.block.size;

    let position = this.headPosition();

    switch (this.direction) {
      case 'up':
        position.y -= blockSize;
        break;

      case 'down':
        position.y += blockSize;
        break;

      case 'left':
        position.x -= blockSize;
        break;

      case 'right':
        position.x += blockSize;
        break;

      default:
        return false; // invalid key
    }

    if (board.onBoard(position) && !this.onSnake(position)) {
      if (this.newSegments) {
        this.newSegments--;
        this.addSegment();
      }

      // replace last tail as new head
      this.blocks[0].classList.remove(this.classHead);
      this.blocks.unshift(this.blocks.pop());
      board.block.move(this.blocks[0], position);
      this.blocks[0].classList.add(this.classHead);

      return true;
    }

    this.isDead = true;

    return false;
  };

  this.checkWin = function () {
    if (this.blocks.length >= board.columns * board.rows) this.isWin = true;
  };

  this.checkApple = function () {
    const snakeHeadPos = unit.block(this.blocks[0]);

    if (apple.onApple(snakeHeadPos)) {
      this.newSegments++;
      apple.random();
    }
  };

  this.setDirection = function (key) {
    let nextDirection;

    for (const direction in this.keys) {
      if (this.keys[direction].includes(key)) {
        nextDirection = direction; // direction: up, down, left, right
      }
    }

    // invalid key
    if (!nextDirection) return;

    // fix reverse movement
    // if both key is in x or y direction ignore it
    const lor = ['left', 'right'];
    const uod = ['up', 'down'];

    if (lor.includes(this.direction) && lor.includes(nextDirection)) return;
    if (uod.includes(this.direction) && uod.includes(nextDirection)) return;

    this.direction = nextDirection;
  };
}

export default Snake;
