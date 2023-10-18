import CONFIG from './settings.js';

import { board, apple } from './game.js';

class Snake {
  constructor() {
    this.newSegments = CONFIG.snake.length;
    this.initPosition = CONFIG.snake.position;
    this.direction = CONFIG.snake.direction;

    this.score = CONFIG.snake.score.init;
    this.scoreIncrement = CONFIG.snake.score.increment;

    this.keys = CONFIG.keys.snake;

    this.blocks = [];
    this.lastDirection = this.direction;
    this.class = { head: 'snake-head', body: 'snake-body' };

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
    return this.blocks.at(-1);
  }
  getHeadPosition() {
    return board.getBlockPosition(this.getHead());
  }
  getTailPosition() {
    return board.getBlockPosition(this.getTail());
  }

  // use last tail as new head
  useTailAsHead(position) {
    this.blocks[0].classList.remove(this.class.head);

    this.blocks.unshift(this.blocks.pop());
    board.setBlockPosition(this.blocks[0], position);

    this.blocks[0].classList.add(this.class.head);
  }

  addSegment(position) {
    let block;

    if (position) {
      block = board.addBlock([this.class.body, this.class.head], position);
    } else {
      block = board.addBlock(this.class.body, this.getTailPosition());
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
    // if (!this.isDead()) return false;

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

      const { x: blockx, y: blocky } = board.getBlockPosition(block);

      return blockx === position.x && blocky === position.y;
    });
  }

  isDead() {
    const headPosition = this.getHeadPosition();

    return !board.isOnBoard(headPosition) || this.isOnSnake(headPosition, true);
  }

  checkApple() {
    if (apple.isOnApple(this.getHeadPosition())) {
      this.newSegments++;
      this.score += this.scoreIncrement;
      apple.random();
    }
  }

  getDirections() {
    const direction = this.lastDirection;

    const horizontal = ['left', 'right'];
    const vertical = ['up', 'down'];

    if (vertical.includes(direction)) return horizontal.concat(direction);
    else return vertical.concat(direction);
  }

  setDirection(key) {
    // for fixing reverse movement
    const directions = this.getDirections();

    for (const direction of directions) {
      if (this.keys[direction].includes(key)) {
        this.direction = direction;
      }
    }
  }
}

export default Snake;
