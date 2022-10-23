import { BLOCK_CLASS, FOOD_POSITION } from './settings.js';

import { unit } from './utils/unit.js';
import { board } from './app.js';

function Apple() {
  this.class = BLOCK_CLASS.apple;
  this.initPosition = FOOD_POSITION;

  this.add = function (position) {
    this.block = board.block.add(this.class, position);
  };

  this.random = function () {
    this.animation();

    let isMoved = board.block.move(this.block, { random: true });

    if (!isMoved) board.block.remove(this.block);
  };

  this.onApple = function (position) {
    let applePosition = unit.block(this.block);

    return unit.isEqual(applePosition, position);
  };

  this.animation = function () {
    this.block.style.backgroundColor = 'var(--bg-board)';

    setTimeout(() => this.block.style.removeProperty('background-color'), 300);
  };

  this.init = function () {
    this.add(this.initPosition);
  };
}

export default Apple;
