import Board from './board.js';
import Snake from './snake.js';

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
  this.snake = new Snake(this.board, startLength, direction);

  // functions
  this.gameLoop = function (render) {
    let fps = 1000 / this.FPS;
    let oldTimestamp;

    function update(timestamp) {
      window.requestAnimationFrame(update);

      if (timestamp - oldTimestamp < fps) return;

      // render functions
      render();

      oldTimestamp = timestamp;
    }

    // run game loop
    update();
  };

  this.start = function () {
    // handel keys
    window.onkeydown = (e) => this.snake.setDirection(e.key);

    // game loop

    this.gameLoop(() => {
      this.snake.render();
    });
  };
}

export default SnakeGame;
