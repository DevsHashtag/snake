import { board } from './game.js';

function Apple() {
  this.class = 'apple';

  this.init = function () {
    this.block = board.addBlock(this.class, { random: true });
  };

  this.random = function () {
    this.animation();

    board.setBlockPosition(this.block, { random: true });
  };

  this.animation = function (duration = 200) {
    this.block.style.backgroundColor = 'var(--bg-apple-moving)';

    setTimeout(() => {
      this.block.style.removeProperty('background-color');
    }, duration);
  };

  this.getPosition = function () {
    return board.getBlockPosition(this.block);
  };

  this.isOnApple = function (position) {
    const applePosition = this.getPosition();

    return applePosition.x == position.x && applePosition.y == position.y;
  };
}

export default Apple;
