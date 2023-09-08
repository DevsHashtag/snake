const isMobile = window.matchMedia('(max-width: 600px)').matches;

const CONFIG = {
  pause: false,

  speed: {
    init: 20,
    step: 5,
    min: 5,
    max: 120,
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
    columns: isMobile ? 30 : 30,
    rows: isMobile ? 20 : 20,
    gap: 1,

    blockSize: isMobile ? 15 : 20,
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
