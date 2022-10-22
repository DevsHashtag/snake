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
      snakeHead: 'snake-head',
      apple: 'snake-apple',

      win: ['board-message', 'message-win'],
      gameover: ['board-message', 'message-gameover'],
    },

    // add block
    add: function (classNames, position, isBlock = true) {
      // create new block element
      const block = document.createElement('div');
      const blockSize = this.board.position.px(this.size);

      // convert className to Array
      classNames = typeof classNames == 'string' ? [classNames] : classNames;

      // add class names
      block.classList.add(...classNames);

      // move block to position
      if (position) {
        this.move(block, position);
      }

      // width, height of block
      if (isBlock) {
        block.style.width = blockSize;
        block.style.height = blockSize;
      }

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

export default Board;
