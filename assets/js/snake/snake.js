import CONFIG from './settings.js';

import { board, apple } from './game.js';

class Snake {
  constructor() {
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

    this.addSegment(this.initPosition);
  }

  render() {
    this.move();
    this.checkApple();
  }

  getHead() {
    return this.blocks[0];
  }

  getTail() {
    return this.blocks.slice(-1)[0];
  }
  getHeadPosition() {
    return board.getBlockPosition(this.getHead());
  }
  getTailPosition() {
    return board.getBlockPosition(this.getTail());
  }

  // use last tail as new head
  useTailAsHead(position) {
    this.blocks[0].classList.remove(this.classHead);

    this.blocks.unshift(this.blocks.pop());
    board.setBlockPosition(this.blocks[0], position);

    this.blocks[0].classList.add(this.classHead);
  }

  addSegment(position) {
    let block;

    if (position) {
      block = board.addBlock([this.classBody, this.classHead], position);
    } else {
      block = board.addBlock(this.classBody, this.getTailPosition());
    }

    this.blocks.push(block);

    // status.updateScore(this.score);
  }

  move() {
    if (!this.blocks.length) return false;

    const position = this.getHeadPosition();

    if (this.direction === 'up') position.y--;
    else if (this.direction === 'down') position.y++;
    else if (this.direction === 'left') position.x--;
    else if (this.direction === 'right') position.x++;
    else return false; // invalid key

    // dont die
    if (!board.isOnBoard(position) || this.isOnSnake(position)) return false;

    if (this.newSegments) {
      this.addSegment();
      this.newSegments--;
    }

    // use last tail as new head
    this.useTailAsHead(position);

    // save last direction
    this.lastDirection = this.direction;

    return true;
  }

  isOnSnake(position, ignoreHead = false) {
    return this.blocks.some((block, index) => {
      if (ignoreHead && index === 0) return false;

      const blockPosition = board.getBlockPosition(block);

      return blockPosition.x === position.x && blockPosition.y === position.y;
    });
  }

  isDead() {
    const headPosition = this.getHeadPosition();

    this.dead = board.isOnBoard(headPosition) || this.isOnSnake(headPosition, true);

    return this.dead;
  }

  checkApple() {
    if (apple.isOnApple(this.getHeadPosition())) {
      this.newSegments++;
      this.score += this.scoreIncrement;
      apple.random();
    }
  }

  setDirection(key) {
    const horizontal = ['left', 'right'];
    const vertical = ['up', 'down'];

    for (const direction in this.keys) {
      if (this.keys[direction].includes(key)) {
        // fix reverse movement
        // if both key is same or in same direction ignore it
        const isSameHorizontal = horizontal.includes(direction) && horizontal.includes(this.lastDirection);
        const isSameVertical = vertical.includes(direction) && vertical.includes(this.lastDirection);

        if (isSameHorizontal || isSameVertical) {
          this.direction = this.lastDirection;
          return;
        }

        this.direction = direction; // direction: up, down, left, right
        break;
      }
    }
  }
}

export default Snake;
