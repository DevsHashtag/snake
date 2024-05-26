import CONFIG from './settings.js';

import Board from './board.js';
import Apple from './apple.js';
import Snake from './snake.js';
import Ai from './ai.js';

export const board = new Board();
export const snake = new Snake();
export const apple = new Apple();
export const ai = new Ai();

class Game {
  constructor() {
    this.isPause = CONFIG.pause;
    this.speed = CONFIG.speed.init;
    this.keys = CONFIG.keys;

    this.requestLoopId;
    this.lastRenderTime = 400;
    this.isGameOver = false;

    board.updateScore(snake.score);
    board.updateSpeed(this.speed);
  }

  run() {
    // handel keys
    window.onkeydown = (e) => this.keydown(e.key);

    // start game
    if (!this.isGameOver && !this.isPause) {
      this.loop();
    }
  }

  keydown(key) {
    const step = CONFIG.speed.step;
    const max = CONFIG.speed.max;
    const min = CONFIG.speed.min;

    switch (key) {
      case this.keys.speedUp:
        if (this.speed < max) this.speed += step;
        else this.speed = max;
        board.updateSpeed(this.speed);
        break;

      case this.keys.speedDown:
        if (this.speed > min) this.speed -= step;
        else this.speed = min;
        board.updateSpeed(this.speed);
        break;

      case this.keys.speedReset:
        this.speed = CONFIG.speed.init;
        board.updateSpeed(this.speed);
        break;

      case this.keys.pause:
        this.isPause = !this.isPause;
        if (!this.isGameOver && !this.isPause) this.loop();
        break;

      default:
        snake.setDirection(key);
    }
  }

  loop() {
    if (this.isGameOver || this.isPause) {
      this.stop();
      return;
    }

    this.requestLoopId = window.requestAnimationFrame((time) => {
      this.loop();

      if (time - this.lastRenderTime < 1000 / this.speed) return;
      this.lastRenderTime = time;

      this.update();
    });
  }

  update() {
    ai.snakeBrain();
    snake.render();

    if (this.checkWin() || this.checkGameOver()) {
      this.isGameOver = true;
      this.stop();
    }
  }

  stop() {
    if (!this.requestLoopId) return;

    window.cancelAnimationFrame(this.requestLoopId);
  }

  checkGameOver() {
    if (snake.isDead()) {
      alert('SNAKE DIED');
      return true;
    }
  }

  checkWin() {
    const boardSize = board.rows * board.columns;
    const snakeLength = snake.blocks.length;

    if (snakeLength >= boardSize) {
      alert('SNAKE WON');
      apple.hide();
      return true;
    }
  }
}

export default Game;
