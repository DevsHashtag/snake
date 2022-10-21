function Food(board, startPos = { left: 0, top: 0 }, type = 'snake-food') {
  // board
  this.board = board;

  // food blocks class name
  this.type = type;

  // functions
  // add food to board
  this.add = function (position) {
    this.block = this.board.block.add(this.type, position);
  };

  // move food inside board
  this.move = function (position) {
    this.board.block.move(this.block, position);
  };

  // move food to random position
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
        } else {
          console.log('removed block: ', { left: x, top: y });
        }
      }
    }

    // randomly choose a position
    const position = freePositions[Math.floor(Math.random() * freePositions.length)];

    this.move(position);
  };

  // food init
  this.add(startPos);
}

export default Food;
