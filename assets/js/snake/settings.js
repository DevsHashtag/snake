const CONFIG = {
  pause: false,

  speed: {
    init: 10,
    step: 8,
    min: 4,
    max: 128,
  },

  keys: {
    pause: 'p',
    speedUp: '+',
    speedDown: '-',
    speedReset: '0',

    snake: {
      down: ['s', 'j', '2', 'ArrowDown'],
      up: ['w', 'k', '8', 'ArrowUp'],
      left: ['a', 'h', '4', 'ArrowLeft'],
      right: ['d', 'l', '6', 'ArrowRight'],
    },
  },

  board: {
    columns: 10,
    rows: 8,
    gap: 0.1,

    blockSize: 2.5,
  },

  snake: {
    length: 4,
    position: { center: true }, // { random: true}, { x: 0, y:0 },
    direction: 'right',

    score: {
      init: 0,
      increment: 1,
    },
  },
};

export default CONFIG;
