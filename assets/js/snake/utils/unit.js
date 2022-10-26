import { board } from '../app.js';

export const unit = {
  pixel: (pos) => `${pos}px`,

  position: (block) => {
    return {
      x: parseInt(block.style.left) / board.blockSize,
      y: parseInt(block.style.top) / board.blockSize,
    };
  },

  isEqual: (pos1, pos2) => pos1.x == pos2.x && pos1.y == pos2.y,
};
