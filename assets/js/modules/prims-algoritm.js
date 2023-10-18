class PrimsAlgorithm {
  constructor(columns, rows) {
    this.columns = Math.floor(columns / 2);
    this.rows = Math.floor(rows / 2);
  }

  // nodes: split grid into 2x2 blocks
  createNodes() {
    let nodes = [];

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        // node:
        nodes.push({
          x: x * 2 + 1,
          y: y * 2 + 1,
        });
      }
    }

    return nodes;
  }

  // edges: connect all nodes once
  createEdges() {
    const random = () => Math.floor(Math.random() * 3 + 1);

    let edges = [];

    // row edges
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns - 1; x++) {
        const startNode = y * this.columns + x;
        const endNode = startNode + 1;

        edges.push({ startNode, endNode, weight: random() });
      }
    }

    // column edges
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows - 1; y++) {
        const startNode = y * this.columns + x;
        const endNode = startNode + this.columns;

        edges.push({ startNode, endNode, weight: random() });
      }
    }

    return edges;
  }

  createFinalEdges(edges) {
    let unvisited = [...Array(this.columns * this.rows).keys()];
    let visited = [];
    let current = 0;

    let finalEdges = [];

    while (unvisited.length) {
      unvisited = unvisited.filter((x) => x != current);
      visited.push(current);

      let myEdges = [];

      for (const edge of edges) {
        let visitedS = visited.includes(edge.startNode);
        let visitedE = visited.includes(edge.endNode);

        // if both node visited skip it
        if (visitedS && visitedE) continue;

        if (visitedS || visitedE) {
          myEdges.push(edge);
        }
      }

      // break;
      let minEdge = { weight: Infinity };

      for (const edge of myEdges) {
        if (edge.weight < minEdge.weight) minEdge = edge;
      }

      if (unvisited.length == 0) break;

      finalEdges.push(minEdge);

      if (minEdge.weight == Infinity) current = unvisited[0];
      else if (visited.includes(minEdge.endNode)) current = minEdge.startNode;
      else current = minEdge.endNode;
    }

    return finalEdges;
  }
}

export default PrimsAlgorithm;
