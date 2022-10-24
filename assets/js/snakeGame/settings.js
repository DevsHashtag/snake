// game
export const FPS = 15;
export const FPS_MIN = 10;
export const FPS_MAX = 60;
export const FPS_STEP = FPS_MAX / 10;

export const GAME_PAUSE = false;

// grid
export const boardElement = document.querySelector('.snake-game .board');

export const BLOCK_SIZE = 20;
export const BLOCK_MARGIN = 2;

export const GRID_COLUMNS = 40;
export const GRID_ROWS = 30;

export const BLOCK_CLASS = {
  apple: 'snake-apple',
  snake: {
    body: 'snake-body',
    head: 'snake-head',
  },
  win: ['board-message', 'message-win'],
  gameover: ['board-message', 'message-gameover'],
};

// Score
export const SCORE = 1;
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
