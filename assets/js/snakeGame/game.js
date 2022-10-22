import Board from './board.js';
import Snake from './snake.js';
import Apple from './apple.js';

import Keyboard from './keyboard.js';
import GameLoop from './gameLoop.js';

function SnakeGame(boardElement) {
  // game options
  this.boardElement = boardElement;

  this.DEBUG = false;

  this.FPS = 10;
  this.FPS_STEP = 5;
  this.FPS_MAX = 120;

  this.keys = {
    '+': () => {
      if (this.gameloop.FPS < this.FPS_MAX) {
        this.gameloop.FPS += this.FPS_STEP;
      }
    },
    '-': () => {
      if (this.gameloop.FPS > this.FPS_STEP) {
        this.gameloop.FPS -= this.FPS_STEP;
      }
    },
    p: () => this.gameloop.pauseToggle(),
  };

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

  this.keyboard = new Keyboard();

  this.gameloop = new GameLoop(() => {
    this.snake.render(this.apple);

    // win
    if (this.snake.isWin) {
      this.win();
    }

    // game over
    if (this.snake.isDead && !this.DEBUG) {
      this.gameover();
    }
  }, this.FPS);

  // functions
  this.start = function () {
    this.keyboard.keydown((key) => {
      // game keys
      if (key in this.keys) {
        this.keys[key]();
        return;
      }

      // snake keys
      this.snake.setDirection(key);
    });

    // gameloop
    this.gameloop.start();
  };

  // display a message
  this.modalMessage = function (msg, type) {
    let msgElement = this.board.block.add(type, null, false);

    msgElement.innerText = msg;
  };

  // game over
  this.gameover = function () {
    this.gameloop.stop();

    // display game over
    this.modalMessage('game over!', this.board.block.types.gameover);
  };

  // win
  this.win = function () {
    this.gameloop.stop();

    // display win
    this.modalMessage('you win!', this.board.block.types.win);
  };
}

export default SnakeGame;
