import Dom from './utils/dom.js';
import Game from './game.js';
import Board from './board.js';
import Status from './status.js';
import Apple from './apple.js';
import Snake from './snake.js';

export const dom = new Dom();
export const game = new Game();
export const board = new Board();
export const status = new Status();
export const snake = new Snake();
export const apple = new Apple();

export function App() {
  this.run = function () {
    game.init();
  };
}
