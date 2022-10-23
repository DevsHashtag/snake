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
};
