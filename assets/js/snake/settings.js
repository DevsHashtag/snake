export const mainElement = document.querySelector('main.snake-game');
const isMobile = window.matchMedia('(max-width: 600px)').matches;

// game
export const SPEED = 30;
export const SPEED_MIN = 5;
export const SPEED_MAX = 100;
export const SPEED_STEP = 5;

export const GAME_PAUSE = false;

// grid
export const COLUMN_LINES = 10;
export const ROW_LINES = 8;

export const BLOCK_SIZE = isMobile ? 25 : 50;
export const BLOCK_GAP = 2;

export const CLASS_NAMES = {
  container: 'container',
  board: 'board',

  apple: 'snake-apple',
  snake: {
    body: 'snake-body',
    head: 'snake-head',
  },

  statusBar: 'status-bar',

  message: 'board-message',
  win: ['board-message', 'message-win'],
  gameover: ['board-message', 'message-gameover'],
};

// Score
export const SCORE_INIT = 0;
export const SCORE_INCREMENT = 1;

// Food
export const FOOD_POSITION = { random: true };

// Snake
export const SNAKE_LENGTH = 4;
export const SNAKE_POSITION = { center: true };
export const SNAKE_DIRECTION = 'pause';
export const SNAKE_KEYS = {
  up: ['w', '8', 'ArrowUp'],
  down: ['s', '2', 'ArrowDown'],
  left: ['a', '4', 'ArrowLeft'],
  right: ['d', '6', 'ArrowRight'],
};

// status bar
export const STATUS_LABEL = {
  state: GAME_PAUSE ? 'pause' : 'playing',
  score: SCORE_INIT,
  speed: SPEED,
};
