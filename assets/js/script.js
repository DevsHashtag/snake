import SnakeGame from './snakeGame/game.js';

// board element
const boardElement = document.querySelector('.snake-game .board');

// game
const snakeGame = new SnakeGame(boardElement);

snakeGame.start();
