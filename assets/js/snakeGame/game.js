import { Board } from './board.js';

// board element
const boardElement = document.querySelector('.snake-game .board');

// board options [optional]
const boardColumns = 40;
const boardRows = 30;
const blockSize = 20;

// init game
function gameInit() {
  let board = new Board(boardElement, boardColumns, boardRows, blockSize);
}

export default gameInit;
