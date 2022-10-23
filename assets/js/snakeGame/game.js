import Keyboard from './keyboard.js';

import { FPS, FPS_STEP, FPS_MIN, FPS_MAX, GAME_PAUSE } from './settings.js';

function Game() {
  this.fps = FPS;
  this.pause = GAME_PAUSE;

  this.gameOver = false;
  this.requestLoopId = null;
  this.lastRenderTime = 0;

  this.keyboard = new Keyboard();

  this.keys = {
    '+': () => (this.fps += this.fps < FPS_MAX ? FPS_STEP : 0),
    '-': () => (this.fps -= this.fps > FPS_MIN ? FPS_STEP : 0),
    0: () => (this.fps -= FPS),
    p: () => this.pauseToggle(),
  };

  this.loop = function () {
    this.requestLoopId = window.requestAnimationFrame(this.main);
  };

  this.main = function (timestamp) {
    this.loop();

    // TODO: move lastRenderTime after update and check performance
    if (timestamp - this.lastRenderTime < 1000 / this.FPS) return;
    this.lastRenderTime = timestamp;

    this.update();
  };

  this.update = function () {};

  this.stop = function () {
    if (this.requestLoopId === null) return;

    window.cancelAnimationFrame(this.requestLoopId);
  };

  this.pauseToggle = function () {
    if (this.pause) this.loop();
    else this.stop();

    this.pause = !this.pause;
  };
}

export default Game;
