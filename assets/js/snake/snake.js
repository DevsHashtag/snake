import CONFIG from './settings.js';

import { board, apple } from './game.js';

function Snake() {
  this.newSegments = CONFIG.snake.length;
  this.initPosition = CONFIG.snake.position;
  this.direction = CONFIG.snake.direction;

  this.classHead = 'snake-head';
  this.classBody = 'snake-body';

  this.score = CONFIG.snake.score.init;
  this.scoreIncrement = CONFIG.snake.score.increment;

  this.keys = CONFIG.keys.snake;

  this.blocks = [];
  this.isDead = false;
  this.lastDirection = this.direction;

  this.init = function () {
    this.addSegment(this.initPosition);
  };

  this.render = function () {
    this.move();
    this.checkApple();
  };

  this.getHead = () => this.blocks[0];
  this.getTail = () => this.blocks.slice(-1)[0];
  this.getHeadPosition = () => board.getBlockPosition(this.getHead());
  this.getTailPosition = () => board.getBlockPosition(this.getTail());

  // use last tail as new head
  this.useTailAsHead = function (position) {
    this.blocks[0].classList.remove(this.classHead);

    this.blocks.unshift(this.blocks.pop());
    board.setBlockPosition(this.blocks[0], position);

    this.blocks[0].classList.add(this.classHead);
  };

  this.addSegment = function (position) {
    let block;

    if (position) {
      block = board.addBlock([this.classBody, this.classHead], position);
    } else {
      block = board.addBlock(this.classBody, this.getTailPosition());
    }

    this.blocks.push(block);

    // status.updateScore(this.score);
  };

  this.move = function () {
    if (!this.blocks.length) return false;

    const position = this.getHeadPosition();

    if (this.direction === 'up') position.y--;
    else if (this.direction === 'down') position.y++;
    else if (this.direction === 'left') position.x--;
    else if (this.direction === 'right') position.x++;
    else return false; // invalid key

    if (!board.isOnBoard(position) || this.isOnSnake(position)) return false;

    if (this.newSegments) {
      this.addSegment();
      this.newSegments--;
    }

    // use last tail as new head
    this.useTailAsHead(position);

    // set last direction
    this.lastDirection = this.direction;

    return true;
  };

  this.isOnSnake = function (position, ignoreHead = false) {
    return this.blocks.some((block, index) => {
      if (ignoreHead && index === 0) return false;

      const blockPosition = board.getBlockPosition(block);

      return blockPosition.x === position.x && blockPosition.y === position.y;
    });
  };

  this.isDead = function () {
    const headPosition = this.getHeadPosition();

    this.dead = board.isOnBoard(headPosition) || this.isOnSnake(headPosition, true);

    return this.dead;
  };

  this.checkApple = function () {
    if (apple.isOnApple(this.getHeadPosition())) {
      this.newSegments++;
      this.score += this.scoreIncrement;
      apple.random();
    }
  };

  this.setDirection = function (key) {
    const horizontal = ['left', 'right'];
    const vertical = ['up', 'down'];

    for (const direction in this.keys) {
      if (this.keys[direction].includes(key)) {
        // fix reverse movement
        // if both key is in x or y direction ignore it
        if (horizontal.includes(direction) && horizontal.includes(this.lastDirection)) return;
        if (vertical.includes(direction) && vertical.includes(this.lastDirection)) return;

        this.direction = direction; // direction: up, down, left, right
        break;
      }
    }
  };
}

export default Snake;
