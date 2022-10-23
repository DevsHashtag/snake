// Settings
export const boardElement = document.querySelector('.snake-game .board');

// grid
export const GRID_BLOCK = 20;
export const GRID_COLUMNS = 40;
export const GRID_ROWS = 30;

export const GRID_WIDTH = GRID_COLUMNS * GRID_BLOCK;
export const GRID_HEIGHT = GRID_ROWS * GRID_BLOCK;

export const BLOCK_CLASS = {
  apple: 'snake-apple',

  snake: {
    body: 'snake-body',
    head: 'snake-head',
  },

  win: ['board-message', 'message-win'],
  gameover: ['board-message', 'message-gameover'],
};

// export const CROSS_WALLS = false;

// Score
export const SCORE_INCREMENT = 1;

// Food
export const INITIAL_FOOD_POSITION = { random: true };

// Snake
export const INITIAL_SNAKE_LENGTH = 4;
export const INITIAL_SNAKE_POSITION = { x: 0, y: 0 };
