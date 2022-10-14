function Board(element, columns = 40, rows = 30, blockSize = 20) {
  // board element
  this.element = element;

  // board col, row lines
  this.columns = columns;
  this.rows = rows;

  // board size
  this.width = blockSize * this.columns;
  this.height = blockSize * this.rows;
}

export { Board };
