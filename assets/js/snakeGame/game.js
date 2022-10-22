import Board from './board.js';
import Snake from './snake.js';
import Apple from './apple.js';

function SnakeGame(boardElement) {
  // game options
  this.boardElement = boardElement;

  this.DEBUG = false;
  this.FPS = 10;

  // board options [optional]
  let boardColumns = 40;
  let boardRows = 30;
  let blockSize = 20;

  // snake options [optional]
  let startLength = 4; // 0 , size of (board width * height)
  const direction = 'pause'; // up, down, left, right, pause

  // debug-mode values
  if (this.DEBUG) {
    // board
    boardColumns = 4;
    boardRows = 4;
    blockSize = 30;

    // snake
    startLength = 8;
  }

  // game init
  this.board = new Board(this.boardElement, boardColumns, boardRows, blockSize);

  this.apple = new Apple(this.board);

  this.snake = new Snake(this.board, startLength, direction);

  // functions
  this.gameLoop = function (render) {
    let fps = 1000 / this.FPS;
    let oldTimestamp;

    const update = (timestamp) => {
      this.loop = window.requestAnimationFrame(update);

      // skip frames
      if (timestamp - oldTimestamp < fps) return;

      // render functions
      render();

      oldTimestamp = timestamp;
    };

    // run game loop
    window.requestAnimationFrame(update);
  };

  this.stop = function () {
    window.cancelAnimationFrame(this.loop);
  };

  this.start = function () {
    let fired = false;

    // handel keys
    window.onkeydown = (e) => {
      if (!fired) {
        fired = true;
        this.snake.setDirection(e.key);

        setTimeout(() => (fired = false), 10);
      }
    };

    // game loop
    this.gameLoop(() => {
      this.snake.render(this.apple);

      // win
      if (this.snake.isWin) {
        this.win();
      }

      // game over
      if (this.snake.isDead && !this.DEBUG) {
        this.gameover();
      }
    });
  };

  // display a message
  this.modalMessage = function (msg, type) {
    let msgElement = this.board.block.add(type, null, false);

    msgElement.innerText = msg;
  };

  // game over
  this.gameover = function () {
    this.stop();

    // display game over
    this.modalMessage('game over!', this.board.block.types.gameover);
  };

  // win
  this.win = function () {
    this.stop();

    // display win
    this.modalMessage('you win!', this.board.block.types.win);
  };
}

export default SnakeGame;
