import Board from './board.js';
import Snake from './snake.js';
import Apple from './apple.js';

function SnakeGame(boardElement, FPS = 30) {
  // game options
  this.boardElement = boardElement;

  this.FPS = FPS;

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

      if (this.snake.IS_WIN) {
        this.stop();
      }
    });
  };
}

export default SnakeGame;
