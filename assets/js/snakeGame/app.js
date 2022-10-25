import Game from './game.js';
import Board from './board.js';
import Apple from './apple.js';
import Snake from './snake.js';

import Dom from './utils/dom.js';

export const game = new Game();
export const board = new Board();
export const snake = new Snake();
export const apple = new Apple();

export const dom = new Dom();

export function App() {
  this.run = function () {
    game.init();
  };
}
