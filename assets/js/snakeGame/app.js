import Game from './game.js';
import Board from './board.js';

export const board = new Board();
export const game = new Game();

export function App() {
  this.run = function () {
    game.init();
  };
}
