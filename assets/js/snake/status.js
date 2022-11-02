import { COLUMN_LINES, BLOCK_SIZE, CLASS_NAMES, STATUS_LABEL } from './settings.js';

import { toPixel } from './utils/position.js';
import { dom, game } from './app.js';

function Status() {
  this.width = COLUMN_LINES * BLOCK_SIZE;
  this.labels = {};

  this.init = function () {
    this.statusElement = dom.renderElement(CLASS_NAMES.statusBar, dom.containerElement);
    this.statusElement.style.width = toPixel(this.width);

    for (const key in STATUS_LABEL) {
      this.renderStatusLabel(key, STATUS_LABEL[key]);
    }

    this.updateSpeed(game.speed);
  };

  this.renderStatusLabel = function (className, text) {
    const labelElement = dom.renderElement('status-' + className, this.statusElement);

    this.labels[className] = labelElement;

    this.updateLabel(text, className);
  };

  this.updateLabel = function (text, label) {
    if (text === '' || !(label in STATUS_LABEL)) return;

    this.labels[label].innerHTML = `${label}: <span>${text}</span>`;
  };

  this.updateState = function (text, label = 'state') {
    this.updateLabel(text, label);
  };

  this.updateScore = function (text, label = 'score') {
    this.updateLabel(text, label);
  };

  this.updateSpeed = function (text, label = 'speed') {
    this.updateLabel(text, label);
  };

  this.pauseState = function () {
    this.updateState('pause');
  };

  this.playState = function () {
    this.updateState('playing');
    this.updateSpeed(game.speed);
  };

  this.gameOverState = function () {
    this.updateState('game over');
  };

  this.winState = function () {
    this.updateState('you win!');
  };
}

export default Status;
