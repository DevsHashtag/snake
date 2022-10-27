export const mainElement = document.querySelector('main.snake-game');

// game
export const FPS = 14;
export const FPS_MIN = 10;
export const FPS_MAX = 60;
export const FPS_STEP = 2;

export const GAME_PAUSE = false;

// grid
export const COLUMN_LINES = 40;
export const ROW_LINES = 30;

export const BLOCK_SIZE = 20;
export const BLOCK_MARGIN = 2;

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
  state: 'pause',
  score: 0,
  fps: 0,
};
