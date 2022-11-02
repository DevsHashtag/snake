export const mainElement = document.querySelector('main.snake-game');

// game
export const SPEED = 30;
export const SPEED_MIN = 5;
export const SPEED_MAX = 60;
export const SPEED_STEP = 2;

export const GAME_PAUSE = false;

// grid
export const COLUMN_LINES = 26;
export const ROW_LINES = 18;

export const BLOCK_SIZE = 30;
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
export const SNAKE_LENGTH = 40;
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
  score: 0,
  speed: 0,
};
