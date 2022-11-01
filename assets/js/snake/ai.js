import HamiltonianCycle from '../algorithms/hamiltonianCycle.js';
import { dom, board, snake, apple } from './app.js';
import { isEqual } from './utils/position.js';

function Ai() {
  this.init = function () {
    this.columns = board.columns;
    this.rows = board.rows;

    this.gridSize = this.columns * this.rows;

    const hamiltonian = new HamiltonianCycle();
    hamiltonian.init(dom, board);

    const headPosition = snake.getHeadPosition();

    this.cycle = hamiltonian.cycle;
    this.index = this.cycle.findIndex((point) => isEqual(headPosition, point));

    this.snakeDirs = {
      up: snake.keys.up[0],
      down: snake.keys.down[0],
      left: snake.keys.left[0],
      right: snake.keys.right[0],
    };
  };

  this.snakeBrain = function () {
    let headPosition = snake.getHeadPosition();

    // go next or reset cycle, set direction
    if (isEqual(headPosition, this.cycle[this.index])) {
      this.index++;

      if (this.index == this.cycle.length) this.index = 0;
    }

    const snakeLength = snake.getBlocks().length;
    const index = this.index;
    const gridSize = this.gridSize;

    const { apple: appleIndex, tail: tailIndex, neighbors } = this.getCycleIndexes();

    // console.log(appleIndex, tailIndex, moves, index, gridSize, snakeLength);

    // hamiltonian cycle rules [for snake game]
    if (snakeLength < Math.floor(gridSize / 1.8)) {
      let newIndex = -1;

      if (appleIndex > index && snakeLength < Math.floor(gridSize / 3)) {
        for (const neighbor of neighbors) {
          if (neighbor > index && neighbor < appleIndex && neighbor > newIndex) {
            if (tailIndex > index) {
              if (neighbor < tailIndex) {
                newIndex = neighbor;
              }
            } else {
              newIndex = neighbor;
            }
          }
        }
      } else if (appleIndex > index && ((tailIndex > appleIndex && tailIndex > index) || (tailIndex < appleIndex && tailIndex < index))) {
        for (const neighbor of neighbors) {
          if (neighbor > index && neighbor < appleIndex && neighbor > newIndex) {
            newIndex = neighbor;
          }
        }
      } else if (appleIndex < index) {
        for (const neighbor of neighbors) {
          if (neighbor > index && neighbor > newIndex) {
            if (tailIndex > index && neighbor < tailIndex) {
              newIndex = neighbor;
            }
          } else {
            newIndex = neighbor;
          }
        }
      }

      if (newIndex != -1) {
        this.index = newIndex;
      }
    }

    snake.setDirection(this.getDirection(headPosition, this.cycle[this.index]));
  };

  // return neighbors of point
  this.getNeighbors = function (point) {
    const { x, y } = point;

    const neighbors = {
      up: { x, y: y - 1 },
      down: { x, y: y + 1 },
      left: { x: x - 1, y },
      right: { x: x + 1, y },
    };

    return neighbors;
  };

  // return direction of next move
  this.getDirection = function (curr, next) {
    let direction = snake.direction;

    if (curr.y > next.y) direction = this.snakeDirs.up;
    else if (curr.y < next.y) direction = this.snakeDirs.down;
    else if (curr.x > next.x) direction = this.snakeDirs.left;
    else if (curr.x < next.x) direction = this.snakeDirs.right;

    return direction;
  };

  // find indexes in hamiltonian cycle
  this.getCycleIndexes = function () {
    const applePos = board.blockPosition(apple.block);
    const tailPos = snake.getTailPosition();
    const neighbors = this.getNeighbors(snake.getHeadPosition());

    let cycleIndexes = { apple: -1, tail: -1, neighbors: [] };

    for (const [index, pos] of this.cycle.entries()) {
      if (isEqual(applePos, pos)) cycleIndexes.apple = index;
      else if (isEqual(tailPos, pos)) cycleIndexes.tail = index;
      else if (isEqual(neighbors.up, pos)) cycleIndexes.neighbors.push(index);
      else if (isEqual(neighbors.down, pos)) cycleIndexes.neighbors.push(index);
      else if (isEqual(neighbors.left, pos)) cycleIndexes.neighbors.push(index);
      else if (isEqual(neighbors.right, pos)) cycleIndexes.neighbors.push(index);
    }

    return cycleIndexes;
  };
}

export default Ai;
