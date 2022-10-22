function GameLoop(renderFunction, FPS = 30) {
  this.renderFunction = renderFunction;

  this.FPS = FPS;
  this.PAUSE = false;
  this.oldTimestamp;

  // functions
  this.update = (timestamp) => {
    // request new frame
    this.requestId = window.requestAnimationFrame(this.update);

    // skip frames
    if (timestamp - this.oldTimestamp < 1000 / this.FPS) return;

    this.renderFunction();

    // update old timestamp
    this.oldTimestamp = timestamp;
  };

  this.start = function () {
    this.requestId = window.requestAnimationFrame(this.update);
  };

  this.stop = function () {
    window.cancelAnimationFrame(this.requestId);
  };

  this.pauseToggle = function () {
    if (this.PAUSE) {
      this.start();
    } else {
      this.stop();
    }

    this.PAUSE = !this.PAUSE;
  };
}

export default GameLoop;
