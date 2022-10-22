import Board from './board.js';
import Snake from './snake.js';
import Apple from './apple.js';

function SnakeGame(boardElement) {
  // game options
  this.boardElement = boardElement;

  this.FPS = 30;

  // board options [optional]
  const boardColumns = 40;
  const boardRows = 30;
  const blockSize = 20;

  // snake options [optional]
  const startLength = 4; // 0 , size of (board width * height)
  const direction = 'pause'; // up, down, left, right, pause

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
    // handel keys
    window.onkeydown = (e) => this.snake.setDirection(e.key);

    // game loop
    this.gameLoop(() => {
      this.snake.render(this.apple);

      // win
      if (this.snake.isWin) {
        this.win();
      }

      // game over
      if (this.snake.isDead) {
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
