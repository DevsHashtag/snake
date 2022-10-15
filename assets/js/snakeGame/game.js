import Board from './board.js';
import Snake from './snake.js';

// board element
const boardElement = document.querySelector('.snake-game .board');

// board options [optional]
const boardColumns = 40;
const boardRows = 30;
const blockSize = 20;

// snake options [optional]
const startLength = 4;
const direction = 'ArrowRight';

// init game
function gameInit() {
  let board = new Board(boardElement, boardColumns, boardRows, blockSize);
  let snake = new Snake(board, startLength, direction);
}

export default gameInit;
