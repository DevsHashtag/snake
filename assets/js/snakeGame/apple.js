import { CLASS_NAMES, FOOD_POSITION } from './settings.js';

import { unit } from './utils/unit.js';
import { board } from './app.js';

function Apple() {
  this.class = CLASS_NAMES.apple;
  this.initPosition = FOOD_POSITION;

  this.add = function (position) {
    this.blockElement = board.addBlock(this.class, position);
  };

  this.random = function () {
    this.animation();

    board.moveBlock(this.blockElement, { random: true });
  };

  this.onApple = function (position) {
    let applePosition = unit.block(this.blockElement);

    return unit.isEqual(applePosition, position);
  };

  this.animation = function () {
    this.blockElement.style.backgroundColor = 'var(--bg-board)';

    setTimeout(() => this.blockElement.style.removeProperty('background-color'), 300);
  };

  this.init = function () {
    this.add(this.initPosition);
  };
}

export default Apple;
