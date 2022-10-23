export const unit = {
  px: (pos) => `${pos}px`,
  rem: (pos) => `${pos}rem`,
  number: (pos) => parseInt(pos),

  block: (block) => {
    return {
      x: parseInt(block.style.left),
      y: parseInt(block.style.top),
    };
  },
  isEqual: (pos1, pos2) => pos1.x == pos2.x && pos1.y == pos2.y,
};
