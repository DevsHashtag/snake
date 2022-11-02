import { SPEED, SPEED_STEP, SPEED_MIN, SPEED_MAX, GAME_PAUSE, CLASS_NAMES } from './settings.js';

import { dom, status, board, snake, apple, ai } from './app.js';

function Game() {
  this.speed = SPEED;
  this.pause = GAME_PAUSE;

  this.requestLoopId;
  this.lastRenderTime = 0;

  this.gameOver = false;

  this.keys = {
    '+': () => {
      if (this.speed < SPEED_MAX) this.speed += SPEED_STEP;
      if (this.speed > SPEED_MAX) this.speed = SPEED_MAX;
      status.updateSpeed(this.speed);
    },
    '-': () => {
      if (this.speed > SPEED_MIN) this.speed -= SPEED_STEP;
      if (this.speed < SPEED_MIN) this.speed = SPEED_MIN;
      status.updateSpeed(this.speed);
    },
    0: () => {
      this.speed = SPEED;
      status.updateSpeed(this.speed);
    },
    p: () => this.pauseToggle(),
    Escape: () => this.pauseToggle(),
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
    if (timestamp - this.lastRenderTime < 1000 / this.speed) return;
    this.lastRenderTime = timestamp;

    this.update();
  };

  this.update = function () {
    ai.snakeBrain();
    snake.render();

    this.checkGameOver();
    this.checkWin();
  };

  this.init = function () {
    dom.init();
    status.init();
    board.init();
    apple.init();
    snake.init();
    ai.init();

    this.keydown((key) => {
      // game keys
      if (key in this.keys) {
        this.keys[key]();
        return;
      }

      if (this.pause || this.gameOver) return;

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

    this.pause = !this.pause;

    if (this.pause) {
      status.pauseState();
      this.stop();
    } else {
      status.playState();
      this.loop();
    }
  };

  this.checkGameOver = function () {
    this.gameOver = snake.isDead();

    if (!this.gameOver) return false;

    this.stop();
    status.gameOverState();
    board.renderMessage('game over', CLASS_NAMES.gameover);

    return true;
  };

  this.checkWin = function (className = CLASS_NAMES.snake.body) {
    const blocks = board.blocks[className] ?? [];

    // if there is a free space its not win
    if (blocks.length < board.columns * board.rows) return false;

    this.stop();
    status.winState();
    board.renderMessage('you win!', CLASS_NAMES.win);

    return true;
  };
}

export default Game;
