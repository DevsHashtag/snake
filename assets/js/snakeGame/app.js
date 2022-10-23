import Game from './game.js';
import Board from './board.js';
import Apple from './apple.js';

export const board = new Board();
export const game = new Game();
export const apple = new Apple();

export function App() {
  this.run = function () {
    game.init();
  };
}
