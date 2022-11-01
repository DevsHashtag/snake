import { CLASS_NAMES, FOOD_POSITION } from './settings.js';

import { isEqual } from './utils/position.js';
import { board } from './app.js';

function Apple() {
  this.className = CLASS_NAMES.apple;
  this.initPosition = FOOD_POSITION;

  this.random = function () {
    this.animation();

    board.moveBlock(this.block, { random: true });
  };

  this.onApple = function (position) {
    const applePosition = this.getPosition();

    return isEqual(applePosition, position);
  };

  this.getPosition = function () {
    return board.blockPosition(this.block);
  };

  this.animation = function () {
    this.block.style.backgroundColor = 'var(--bg-apple-moving)';

    setTimeout(() => this.block.style.removeProperty('background-color'), 300);
  };

  this.init = function () {
    this.block = board.addBlock(this.className, this.initPosition);
  };
}

export default Apple;
