import PrimsAlgorithm from './primsAlgoritm.js';

function HamiltonianCycle() {
  this.DIRS = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  };

  this.init = function (dom, board) {
    this.board = board;

    this.columns = board.columns;
    this.rows = board.rows;

    const prims = new PrimsAlgorithm();
    prims.init(dom, board);

    this.finalEdges = prims.finalEdges;
    this.nodes = prims.nodes;

    this.cycle = this.createCycle();
  };

  this.createCycle = function () {
    let points = [];

    for (const edge of this.finalEdges) {
      const start = structuredClone(this.nodes[edge.startNode]);
      const end = structuredClone(this.nodes[edge.endNode]);

      const midX = Math.floor((start.x + end.x) / 2);
      const midY = Math.floor((start.y + end.y) / 2);

      const mid = { x: midX, y: midY };

      points.push(start, mid, end);
    }

    const isInPoints = (x, y) => points.some((pos) => pos.x == x && pos.y == y);
    const isInCycle = (current) => cycle.some((pos) => pos.x == current.x && pos.y == current.y);

    let cycle = [{ x: 0, y: 0 }];
    let current = cycle[0];
    let direction = this.DIRS.right;

    while (cycle.length < this.columns * this.rows) {
      const { x, y } = current;

      const dirX = direction.x + x;
      const dirY = direction.y + y;

      switch (direction) {
        case this.DIRS.right:
          if (isInPoints(x + 1, y + 1) && !isInPoints(x + 1, y)) {
            current = { x: dirX, y: dirY };
          } else if (isInPoints(x, y + 1) && !isInPoints(x + 1, y + 1)) {
            direction = this.DIRS.down;
          } else {
            direction = this.DIRS.up;
          }
          break;

        case this.DIRS.down:
          if (isInPoints(x, y + 1) && !isInPoints(x + 1, y + 1)) {
            current = { x: dirX, y: dirY };
          } else if (isInPoints(x, y + 1) && isInPoints(x + 1, y + 1)) {
            direction = this.DIRS.right;
          } else {
            direction = this.DIRS.left;
          }
          break;

        case this.DIRS.left:
          if (isInPoints(x, y) && !isInPoints(x, y + 1)) {
            current = { x: dirX, y: dirY };
          } else if (!isInPoints(x, y + 1)) {
            direction = this.DIRS.up;
          } else {
            direction = this.DIRS.down;
          }
          break;

        case this.DIRS.up:
          if (isInPoints(x + 1, y) && !isInPoints(x, y)) {
            current = { x: dirX, y: dirY };
          } else if (isInPoints(x + 1, y)) {
            direction = this.DIRS.left;
          } else {
            direction = this.DIRS.right;
          }
          break;
      }

      if (!isInCycle(current)) {
        cycle.push(current);
      }
    }

    // let lastHead;
    // let interval = setInterval(() => {
    //   if (lastHead) {
    //     lastHead.classList.remove(CLASS_NAMES.snake.head);
    //   }

    //   lastHead = this.board.addBlock('snake-body', cycle.shift());
    //   lastHead.classList.add(CLASS_NAMES.snake.head);

    //   if (!cycle.length) window.clearInterval(interval);
    // }, 30);

    return cycle;
  };
}

export default HamiltonianCycle;
