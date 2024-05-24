const CONFIG = {
  pause: false,

  speed: {
    init: 50,
    step: 10,
    min: 10,
    max: 100,
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
    columns: 12,
    rows: 10,
    gap: 0.1,

    blockSize: 3,
  },

  snake: {
    length: 4,
    position: { x: 0, y: 0 }, // { random: true}, { x: 0, y:0 },
    direction: 'right',

    score: {
      init: 0,
      increment: 1,
    },
  },
};

export default CONFIG;
