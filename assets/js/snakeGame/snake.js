import { SNAKE_LENGTH, SNAKE_POSITION, SNAKE_DIRECTION, SNAKE_KEYS, CLASS_NAMES } from './settings.js';

import { unit } from './utils/unit.js';
import { board, apple } from './app.js';

function Snake() {
  this.blocks = [];
  this.newSegments = SNAKE_LENGTH;
  this.direction = SNAKE_DIRECTION;
  this.lastDirection = SNAKE_DIRECTION;
  this.classBody = CLASS_NAMES.snake.body;
  this.classHead = CLASS_NAMES.snake.head;
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
      block = board.addBlock([this.classBody, this.classHead], position);
    } else {
      const tailPosition = unit.block(this.blocks.slice(-1)[0]);
      block = board.addBlock(this.classBody, tailPosition);
    }

    this.blocks.push(block);
  };

  this.move = function () {
    if (!this.blocks.length) return false;

    let position = this.getHeadPosition();

    switch (this.direction) {
      case 'up':
        position.y--;
        break;

      case 'down':
        position.y++;
        break;

      case 'left':
        position.x--;
        break;

      case 'right':
        position.x++;
        break;

      default:
        return false; // invalid key
    }

    if (!board.onBoard(position) || this.onSnake(position)) return false;

    if (this.newSegments) {
      this.newSegments--;
      this.addSegment();
    }

    // replace last tail as new head
    this.blocks[0].classList.remove(this.classHead);
    this.blocks.unshift(this.blocks.pop());
    board.moveBlock(this.blocks[0], position);
    this.blocks[0].classList.add(this.classHead);

    this.lastDirection = this.direction;

    return true;
  };

  this.onSnake = function (position, { ignoreHead = false } = {}) {
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
