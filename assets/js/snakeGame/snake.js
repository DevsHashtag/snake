import { SNAKE_LENGTH, SNAKE_POSITION, SNAKE_DIRECTION, SNAKE_KEYS, BLOCK_CLASS } from './settings.js';

import { unit } from './utils/unit.js';
import { board, apple } from './app.js';

function Snake() {
  this.blocks = [];
  this.newSegments = SNAKE_LENGTH;
  this.direction = SNAKE_DIRECTION;
  this.lastDirection = SNAKE_DIRECTION;
  this.classBody = BLOCK_CLASS.snake.body;
  this.classHead = BLOCK_CLASS.snake.head;
  this.keys = SNAKE_KEYS;
  this.dead = false;

  this.init = function () {
    this.addSegment(SNAKE_POSITION);
  };

  this.render = function () {
    this.move();
    this.checkApple();
  };

  this.getHeadPosition = function () {
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

  this.move = function () {
    if (!this.blocks.length) return false;

    const blockSize = board.block.size;

    let position = this.getHeadPosition();

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

    if (this.newSegments) {
      this.newSegments--;
      this.addSegment();
    }

    // replace last tail as new head
    this.blocks[0].classList.remove(this.classHead);
    this.blocks.unshift(this.blocks.pop());
    board.block.move(this.blocks[0], position);
    this.blocks[0].classList.add(this.classHead);

    // save last direction
    this.lastDirection = this.direction;

    return true;
  };

  this.onSnake = function (position, { ignoreHead = false }) {
    return this.blocks.some((block, index) => {
      if (ignoreHead && index === 0) return false;

      let blockPosition = unit.block(block);

      return unit.isEqual(blockPosition, position);
    });
  };

  this.isDead = function (position = this.getHeadPosition()) {
    this.dead = !board.onBoard(position) || this.onSnake(position, { ignoreHead: true });

    return this.dead;
  };

  this.checkApple = function () {
    if (apple.onApple(this.getHeadPosition())) {
      this.newSegments++;
      apple.random();
    }
  };

  this.setDirection = function (key) {
    for (const direction in this.keys) {
      if (this.keys[direction].includes(key)) {
        this.direction = direction; // direction: up, down, left, right
      }
    }

    // fix reverse movement
    // if both key is in x or y direction ignore it
    const lor = ['left', 'right'];
    const uod = ['up', 'down'];

    const isReverseMovement = [
      lor.includes(this.direction) && lor.includes(this.lastDirection), // both dir left, right
      uod.includes(this.direction) && uod.includes(this.lastDirection), // both dir up, down
    ];

    if (!isReverseMovement.includes(true)) return;

    this.direction = this.lastDirection;
  };
}

export default Snake;
