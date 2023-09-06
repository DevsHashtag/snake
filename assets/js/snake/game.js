import CONFIG from './settings.js';

function Game() {
  this.isPause = CONFIG.pause;
  this.speed = CONFIG.speed.init;
  this.keys = CONFIG.keys;

  this.requestLoopId;
  this.lastRenderTime = 0;

  this.isGameOver = false;

  this.init = function () {
    // handel keys
    window.onkeydown = (e) => this.keydown(e.key);

    // start game
    if (!this.isGameOver && !this.isPause) {
      setTimeout(this.loop, 1000);
    }
  };

  this.keydown = function (key) {
    const step = CONFIG.speed.step;
    const max = CONFIG.speed.max;
    const min = CONFIG.speed.min;

    switch (key) {
      case this.keys.speedUp:
        if (this.speed < max) this.speed += step;
        else this.speed = max;
        break;

      case this.keys.speedDown:
        if (this.speed > min) this.speed -= step;
        else this.speed = min;
        break;

      case this.keys.speedReset:
        this.speed = CONFIG.speed.init;
        break;

      case this.keys.pause:
        this.isPause = !this.isPause;
        if (!this.isGameOver && !this.isPause) this.loop();
        break;

      // other keys
    }
  };

  this.loop = () => {
    if (this.isGameOver || this.isPause) {
      this.stop();
      return;
    }

    this.requestLoopId = window.requestAnimationFrame(this.main);
  };

  this.stop = function () {
    if (!this.requestLoopId) return;

    window.cancelAnimationFrame(this.requestLoopId);
  };

  this.main = (time) => {
    this.loop();

    if (time - this.lastRenderTime < 1000 / this.speed) return;
    console.timeEnd('time');

    this.lastRenderTime = time;
    console.time('time');
  };

  this.checkGameOver = function () {
    // TODO
  };

  this.checkWin = function () {
    // TODO
  };
}

export default Game;
