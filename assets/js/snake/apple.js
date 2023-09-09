import { board } from './game.js';

class Apple {
  constructor() {
    this.class = 'apple';
    this.block = board.addBlock(this.class, { random: true });

    this.block.addEventListener('transitionend', () => {
      if (this.block.style.backgroundColor) {
        this.block.style.removeProperty('background-color');
      }
    });
  }

  random() {
    this.animation();

    board.setBlockPosition(this.block, { random: true });
  }

  animation() {
    this.block.style.backgroundColor = 'var(--bg-apple-moving)';
  }

  getPosition() {
    return board.getBlockPosition(this.block);
  }

  isOnApple(position) {
    const applePosition = this.getPosition();

    return applePosition.x == position.x && applePosition.y == position.y;
  }
}

export default Apple;
