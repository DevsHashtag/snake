function Food(board, startPos = { left: 0, top: 0 }, type = 'snake-food') {
  // board
  this.board = board;

  // food blocks class name
  this.type = type;

  // functions
  this.add = function (position) {
    this.block = this.board.block.add(this.type, position);
  };

  this.move = function (block, position) {
    this.board.block.move(block, position);
  };

  // food init
  this.add(startPos);
}

export default Food;
