function Apple(board, startPos = { random: true }) {
  // board
  this.board = board;

  // apple blocks class name
  this.type = board.block.types.apple;

  // functions
  // add apple to board
  this.add = function (position) {
    this.block = this.board.block.add(this.type, position);
  };

  // move apple inside board
  this.move = function (position) {
    return this.board.block.move(this.block, position);
  };

  // move apple to random position
  this.random = function (boardBlocks) {
    // return if no space is free
    if (boardBlocks.length >= this.board.columns * this.board.rows) return false;

    // move animation
    this.moveAnimation();

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

    return this.move(position);
  };

  // change background while moving
  this.moveAnimation = function () {
    this.block.style.backgroundColor = 'var(--bg-board)';

    setTimeout(() => this.block.style.removeProperty('background-color'), 300);
  };

  // apple init
  this.add(startPos);

  if (startPos.random) {
    this.random([]);
  }
}

export default Apple;
