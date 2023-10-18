import PrimesAlgorithm from "../modules/prims-algoritm.js";
import HamiltonianCycle from "../modules/hamiltonian-cycle.js";
import { board, snake, apple } from "./game.js";

class Ai {
  constructor() {
    this.columns = board.columns;
    this.rows = board.rows;

    // prims algorithm
    const prims = new PrimesAlgorithm(this.columns, this.rows);
    const edges = prims.createEdges();
    this.nodes = prims.createNodes();
    this.finalEdges = prims.createFinalEdges(edges);

    // hamiltonian cycle
    const hamiltonian = new HamiltonianCycle(this.columns, this.rows);
    this.cycle = hamiltonian.createCycle(this.nodes, this.finalEdges);

    // current head index
    this.index = this.cycle.findIndex((pos) => this.isEqual(snake.getHeadPosition(), pos));
    this.gridSize = this.columns * this.rows;

    this.keys = {
      up: snake.keys.up[0],
      down: snake.keys.down[0],
      left: snake.keys.left[0],
      right: snake.keys.right[0],
    };
  }

  snakeBrain() {
    const headPosition = snake.getHeadPosition();
    const snakeLength = snake.blocks.length;
    const gridSize = this.gridSize;

    // go next or reset cycle, set direction
    if (this.isEqual(headPosition, this.cycle[this.index])) {
      this.index++;

      if (this.index == this.cycle.length) this.index = 0;
    }

    // hamiltonian cycle rules [for snake game]
    if (snakeLength < Math.floor(gridSize / 1.8)) {
      const index = this.index;
      const { appleIndex, tailIndex, neighborIndexes } = this.getCycleIndexes();
      const modelimit = snakeLength < Math.floor(this.gridSize / 2);

      let newIndex = index;

      // apple < tail < head && modelimit
      if (appleIndex < tailIndex && tailIndex < index && modelimit) {
        for (const neighbor of neighborIndexes) {
          // neighbor < apple && neighbor > newhead
          if (neighbor < appleIndex && neighbor > newIndex) {
            newIndex = neighbor;
          }
          // neighbor > head
          else if (neighbor > index) {
            newIndex = neighbor;
          }
        }
      }
      // apple > head && modelimit
      else if (appleIndex > index && modelimit) {
        for (const neighbor of neighborIndexes) {
          // neighbor > head && neighbor < apple && neighbor > newhead
          if (neighbor > index && neighbor < appleIndex && neighbor > newIndex) {
            // tail > head
            if (tailIndex > index) {
              // neighbor < tail
              if (neighbor < tailIndex) {
                newIndex = neighbor;
              }
            } else {
              newIndex = neighbor;
            }
          }
        }
      }
      // apple > head && (tail > apple && tail > head) || ( tail < apple && tail < head0)
      else if (
        appleIndex > index &&
        ((tailIndex > appleIndex && tailIndex > index) || (tailIndex < appleIndex && tailIndex < index))
      ) {
        for (const neighbor of neighborIndexes) {
          // neighbor > head && neighbor < apple && neighbor > newhead
          if (neighbor > index && neighbor < appleIndex && neighbor > newIndex) {
            newIndex = neighbor;
          }
        }
      }
      // apple < head
      else if (appleIndex < index) {
        for (const neighbor of neighborIndexes) {
          // neighbor > head && neighbor > newhead
          if (neighbor > index && neighbor > newIndex) {
            // tail > head && neighbor < tail
            if (tailIndex > index && neighbor < tailIndex) {
              newIndex = neighbor;
            }
          } else {
            newIndex = neighbor;
          }
        }
      }

      if (newIndex != index) {
        this.index = newIndex;
      }
    }

    snake.setDirection(this.getDirection(headPosition, this.cycle[this.index]));
  }

  isEqual(pos1, pos2) {
    return pos1.x == pos2.x && pos1.y == pos2.y;
  }

  getSnakeHeadNeighbors() {
    const { x, y } = snake.getHeadPosition();
    const directions = snake.getDirections();

    const neighbors = {
      up: { x, y: y - 1 },
      down: { x, y: y + 1 },
      left: { x: x - 1, y },
      right: { x: x + 1, y },
    };

    return directions.map((key) => neighbors[key]);
  }

  // find indexes in hamiltonian cycle
  getCycleIndexes() {
    const applePos = apple.getPosition();
    const tailPos = snake.getTailPosition();
    const neighbors = this.getSnakeHeadNeighbors();

    let appleIndex;
    let tailIndex;
    let neighborIndexes = [];

    for (const [index, pos] of this.cycle.entries()) {
      if (this.isEqual(applePos, pos)) appleIndex = index;
      else if (this.isEqual(tailPos, pos)) tailIndex = index;

      if (neighbors.some((neighbor) => this.isEqual(neighbor, pos))) neighborIndexes.push(index);
    }

    return { appleIndex, tailIndex, neighborIndexes };
  }
  // return direction of next move
  getDirection(curr, next) {
    let direction = snake.direction;

    if (curr.y > next.y) direction = this.keys.up;
    else if (curr.y < next.y) direction = this.keys.down;
    else if (curr.x > next.x) direction = this.keys.left;
    else if (curr.x < next.x) direction = this.keys.right;

    return direction;
  }
}

export default Ai;
