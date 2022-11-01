function PrimsAlgorithm() {
  this.init = function (dom, board) {
    this.dom = dom;
    this.board = board;

    this.columns = Math.floor(board.columns / 2);
    this.rows = Math.floor(board.rows / 2);

    this.nodes = this.createNodes();
    this.edges = this.createEdges();
    this.finalEdges = this.createFinalEdges();

    // this.drawNodes();
    // this.drawEdges();
  };

  // nodes: split grid into 2x2 blocks
  this.createNodes = function () {
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
  };

  // edges: connect all nodes once
  this.createEdges = function () {
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
  };

  this.createFinalEdges = function () {
    let unvisited = [...Array(this.columns * this.rows).keys()];
    let visited = [];
    let current = 0;

    let finalEdges = [];

    while (unvisited.length) {
      unvisited = unvisited.filter((x) => x != current);
      visited.push(current);

      let myEdges = [];

      for (const edge of this.edges) {
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
  };

  this.drawNodes = function () {
    for (const [index, node] of this.nodes.entries()) {
      const block = this.board.addBlock('grid-nodes', { ...node });

      block.innerText = index.toString();
    }
  };

  this.drawEdges = function () {
    const blockSize = this.board.block.size;
    const size = 10;
    const offset = 1 / (size * 2);

    for (const edge of this.finalEdges) {
      let start = { ...this.nodes[edge.startNode] };
      let end = { ...this.nodes[edge.endNode] };

      let width = Math.abs(start.x - end.x) * blockSize || blockSize / size;
      let height = Math.abs(start.y - end.y) * blockSize || blockSize / size;

      start.x -= offset;
      start.y -= offset;

      if (width == blockSize / size) {
        height += offset;
      } else {
        width += offset;
      }

      let block = this.board.addBlock(['grid-line', `line-${edge.weight}`], start);

      // block.innerText = `${edge.startNode} ${edge.endNode}`;
      this.dom.setSize(block, { width, height });
    }
  };
}

export default PrimsAlgorithm;
