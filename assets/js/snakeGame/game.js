import { FPS, FPS_STEP, FPS_MIN, FPS_MAX, GAME_PAUSE, BLOCK_CLASS } from './settings.js';

import { board, apple, snake } from './app.js';

function Game() {
  this.fps = FPS;
  this.pause = GAME_PAUSE;

  this.requestLoopId = null;
  this.lastRenderTime = 0;

  this.keyFired = false;

  this.keys = {
    '+': () => (this.fps += this.fps < FPS_MAX ? FPS_STEP : 0),
    '-': () => (this.fps -= this.fps > FPS_MIN ? FPS_STEP : 0),
    0: () => (this.fps = FPS),
    p: () => this.pauseToggle(),
  };

  this.keydown = function (handelKeys) {
    window.onkeydown = (e) => {
      if (this.keyFired || e.repeat) return;

      // delay between keys
      this.keyFired = true;
      setTimeout(() => (this.keyFired = false), 10);

      handelKeys(e.key);
    };
  };

  this.loop = () => {
    this.requestLoopId = window.requestAnimationFrame(this.main);
  };

  this.main = (timestamp) => {
    this.loop();

    // TODO: move lastRenderTime after update and check performance
    if (timestamp - this.lastRenderTime < 1000 / this.fps) return;
    this.lastRenderTime = timestamp;

    this.update();
  };

  this.update = function () {
    snake.render();

    if (snake.isWin()) this.win();
    if (snake.isDead) this.gameover();
  };

  this.init = function () {
    board.init();
    snake.init();
    apple.init();

    this.keydown((key) => {
      // game keys
      if (key in this.keys) {
        this.keys[key]();
        return;
      }

      if (this.pause) return;

      // snake keys
      snake.setDirection(key);
    });

    if (!this.pause) this.loop();
  };

  this.stop = function () {
    if (!this.requestLoopId) return;

    window.cancelAnimationFrame(this.requestLoopId);
  };

  this.pauseToggle = function () {
    if (this.pause) this.loop();
    else this.stop();

    this.pause = !this.pause;
  };

  this.gameover = function () {
    this.stop();

    board.block.modalMessage('game over!', BLOCK_CLASS.gameover);
  };

  this.win = function () {
    this.stop();

    board.block.modalMessage('you win!', BLOCK_CLASS.win);
  };
}

export default Game;
