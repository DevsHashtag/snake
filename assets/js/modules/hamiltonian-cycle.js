class HamiltonianCycle {
  constructor(columns, rows) {
    this.columns = columns;
    this.rows = rows;
  }

  createCycle(nodes, finalEdges) {
    let points = [];

    for (const edge of finalEdges) {
      const start = { ...nodes[edge.startNode] };
      const end = { ...nodes[edge.endNode] };

      const midX = Math.floor((start.x + end.x) / 2);
      const midY = Math.floor((start.y + end.y) / 2);

      const mid = { x: midX, y: midY };

      points.push(start, mid, end);
    }

    const isInPoints = (x, y) => points.some((pos) => pos.x == x && pos.y == y);
    const isInCycle = (current) => cycle.some((pos) => pos.x == current.x && pos.y == current.y);

    let cycle = [{ x: 0, y: 0 }];
    let current = cycle[0];

    const directions = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
    };

    let direction = directions.right;

    while (cycle.length < this.columns * this.rows) {
      const { x, y } = current;

      const dirX = direction.x + x;
      const dirY = direction.y + y;

      switch (direction) {
        case directions.right:
          if (isInPoints(x + 1, y + 1) && !isInPoints(x + 1, y)) {
            current = { x: dirX, y: dirY };
          } else if (isInPoints(x, y + 1) && !isInPoints(x + 1, y + 1)) {
            direction = directions.down;
          } else {
            direction = directions.up;
          }
          break;

        case directions.down:
          if (isInPoints(x, y + 1) && !isInPoints(x + 1, y + 1)) {
            current = { x: dirX, y: dirY };
          } else if (isInPoints(x, y + 1) && isInPoints(x + 1, y + 1)) {
            direction = directions.right;
          } else {
            direction = directions.left;
          }
          break;

        case directions.left:
          if (isInPoints(x, y) && !isInPoints(x, y + 1)) {
            current = { x: dirX, y: dirY };
          } else if (!isInPoints(x, y + 1)) {
            direction = directions.up;
          } else {
            direction = directions.down;
          }
          break;

        case directions.up:
          if (isInPoints(x + 1, y) && !isInPoints(x, y)) {
            current = { x: dirX, y: dirY };
          } else if (isInPoints(x + 1, y)) {
            direction = directions.left;
          } else {
            direction = directions.right;
          }
          break;
      }

      if (!isInCycle(current)) {
        cycle.push(current);
      }
    }

    return cycle;
  }
}

export default HamiltonianCycle;
