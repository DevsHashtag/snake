import SnakeGame from './snakeGame/game.js';

// board element
const boardElement = document.querySelector('.snake-game .board');
const FPS = 30;

// game
const snakeGame = new SnakeGame(boardElement, FPS);

snakeGame.start();
