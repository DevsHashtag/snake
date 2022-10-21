function Apple(board, startPos = { left: 0, top: 0 }, type = 'snake-apple') {
  // board
  this.board = board;

  // apple blocks class name
  this.type = type;

  // functions
  // add apple to board
  this.add = function (position) {
    this.block = this.board.block.add(this.type, position);
  };

  // move apple inside board
  this.move = function (position) {
    this.board.block.move(this.block, position);
  };

  // move apple to random position
  this.random = function (boardBlocks) {
    // all blocks positions
    const blockPositions = boardBlocks.map((block) => this.board.position.block(block));
    const blockSize = this.board.block.size;

    let freePositions = [];

    // find board free positions
    for (let y = 0; y < this.board.height; y += blockSize) {
      for (let x = 0; x < this.board.width; x += blockSize) {
        if (!blockPositions.some((position) => position.left == x && position.top == y)) {
          freePositions.push({ left: x, top: y });
        }
      }
    }

    // randomly choose a position
    const position = freePositions[Math.floor(Math.random() * freePositions.length)];

    this.move(position);
  };

  // apple init
  this.add(startPos);
}

export default Apple;
