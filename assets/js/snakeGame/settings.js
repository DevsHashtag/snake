// Settings

// game
export const FPS = 10;
export const FPS_STEP = 10;
export const FPS_MIN = 10;
export const FPS_MAX = 60;

export const GAME_PAUSE = true;

// grid
export const boardElement = document.querySelector('.snake-game .board');

export const GRID_BLOCK = 20;
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
export const SNAKE_POSITION = { x: 0, y: 0 };
