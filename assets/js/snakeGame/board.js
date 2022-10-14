function Board(element, columns = 40, rows = 30, blockSize = 20) {
  // board element
  this.element = element;

  // board col, row lines
  this.columns = columns;
  this.rows = rows;

  // board size
  this.width = blockSize * this.columns;
  this.height = blockSize * this.rows;

  // board block
  this.block = {
    // board
    board: this,

    // block size ( 30 = 30px)
    size: blockSize,

    // default block types
    types: {
      // game blocks
      snake: 'snake-body',
      food: 'snake-food',
    },

    // add block
    add: function (className, position) {
      // create new block element
      const block = document.createElement('div');

      // properties
      // class name
      block.classList.add(className);

      // width, height of block
      block.style.width = this.board.position.px(this.size);
      block.style.height = this.board.position.px(this.size);

      // move block to position
      console.log(this.move(block, position));

      // add to board
      this.board.element.appendChild(block);

      return block;
    },

    // move block
    move: function (block, position) {
      // out of board
      if (!this.board.position.isInBoard(position)) return false;

      // move block
      block.style.left = this.board.position.px(position.left);
      block.style.top = this.board.position.px(position.top);

      return true;
    },
  };

  // board position
  this.position = {
    // board center position
    center: () => {
      return {
        left: this.width / 2 - (this.columns % 2 == 0 ? 0 : this.block.size / 2),
        top: this.height / 2 - (this.rows % 2 == 0 ? 0 : this.block.size / 2),
      };
    },
    // convert position to px
    px: (pos) => `${pos}px`,
    // convert position to rem
    rem: (pos) => `${pos}rem`,
    // convert px position to number
    number: (pos) => parseInt(pos),
    // convert block position to number
    block: (block) => {
      return {
        left: parseInt(block.style.left),
        top: parseInt(block.style.top),
      };
    },
    // check is position is in board
    isInBoard: (pos) => {
      let positionsCheck = [
        pos.left < 0, // out from left
        pos.top < 0, // out from top
        pos.left >= this.width, // out from right
        pos.top >= this.height, // out from down
      ];

      return !positionsCheck.includes(true);
    },
  };

  // board init
  this.element.style.width = this.position.px(this.width);
  this.element.style.height = this.position.px(this.height);
}

export { Board };
