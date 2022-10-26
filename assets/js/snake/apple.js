import { CLASS_NAMES, FOOD_POSITION } from './settings.js';

import { unit } from './utils/unit.js';
import { board } from './app.js';

function Apple() {
  this.class = CLASS_NAMES.apple;
  this.initPosition = FOOD_POSITION;

  this.add = function (position) {
    this.element = board.addBlock(this.class, position);
  };

  this.random = function () {
    this.animation();

    board.moveBlock(this.element, { random: true });
  };

  this.onApple = function (position) {
    const applePosition = unit.position(this.element);

    return unit.isEqual(applePosition, position);
  };

  this.animation = function () {
    this.element.style.backgroundColor = 'var(--bg-apple-moving)';

    setTimeout(() => this.element.style.removeProperty('background-color'), 300);
  };

  this.init = function () {
    this.add(this.initPosition);
  };
}

export default Apple;
