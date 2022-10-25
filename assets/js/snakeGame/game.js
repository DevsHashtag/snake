import { FPS, FPS_STEP, FPS_MIN, FPS_MAX, GAME_PAUSE, BLOCK_CLASS } from './settings.js';

import { board, snake, apple } from './app.js';

function Game() {
  this.fps = FPS;
  this.pause = GAME_PAUSE;

  this.requestLoopId = null;
  this.lastRenderTime = 0;

  this.gameOver = false;

  this.keys = {
    '+': () => (this.fps += this.fps < FPS_MAX ? FPS_STEP : 0),
    '-': () => (this.fps -= this.fps > FPS_MIN ? FPS_STEP : 0),
    0: () => (this.fps = FPS),
    p: () => this.pauseToggle(),
  };

  this.keydown = function (handelKeys) {
    window.onkeydown = (e) => handelKeys(e.key);
  };

  this.loop = () => {
    if (this.gameOver) return;

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

    this.checkGameOver();
    this.checkWin();
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
    if (this.gameOver) return;

    if (this.pause) this.loop();
    else this.stop();

    this.pause = !this.pause;
  };

  this.checkGameOver = function () {
    this.gameOver = snake.isDead();

    if (!this.gameOver) return false;

    this.stop();
    board.message('game over!', BLOCK_CLASS.gameover);

    return true;
  };

  this.checkWin = function (className = BLOCK_CLASS.snake.body) {
    const blocks = board.blocks[className] ?? [];

    // if there is a free space its not win
    if (blocks.length < board.columns * board.rows) return false;

    this.stop();
    board.message('you win!', BLOCK_CLASS.win);

    return true;
  };
}

export default Game;
