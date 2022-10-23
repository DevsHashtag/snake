import { BLOCK_CLASS, FOOD_POSITION } from './settings.js';

import { board } from './app.js';

function Apple() {
  this.class = BLOCK_CLASS.apple;
  this.initPosition = FOOD_POSITION;

  this.add = function (position) {
    this.block = board.block.add(this.class, position);
  };

  this.move = function (position) {
    board.block.move(this.block, position);
  };

  // move apple to random position
  this.random = function () {
    const freePositions = board.freePositions();
    const randomPosition = freePositions[Math.floor(Math.random() * freePositions.length)];

    if (!randomPosition) return;

    this.moveAnimation();
    this.move(randomPosition);
  };

  this.moveAnimation = function () {
    this.block.style.backgroundColor = 'var(--bg-board)';

    setTimeout(() => this.block.style.removeProperty('background-color'), 300);
  };

  this.init = function () {
    this.add();

    if (this.initPosition.random) {
      this.random();
    }
  };
}

export default Apple;
