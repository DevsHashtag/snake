function Snake(board, startLength = 4, direction = 'ArrowLeft', type = 'snake-body', typeHead = 'snake-head', keys) {
  // board
  this.board = board;

  // snake block elements
  this.blocks = [];

  // snake start length
  this.startLength = startLength;

  // snake direction
  this.direction = direction;

  // snake blocks class name
  this.type = type;
  this.typeHead = typeHead;

  // score
  this.score = startLength;

  // keys for control snake
  this.keys = keys ?? {
    up: ['ص', 'w', '8', 'ArrowUp'],
    down: ['س', 's', '2', 'ArrowDown'],
    left: ['ش', 'a', '4', 'ArrowLeft'],
    right: ['ی', 'd', '6', 'ArrowRight'],
  };

  // functions
  // add start Blocks
  this.addStartBlocks = function () {
    if (this.startLength > 0) {
      this.addBlock();
      this.startLength--;
    }
  };

  // set direction
  this.setDirection = function (key) {
    for (const direction in this.keys) {
      if (this.keys[direction].includes(key)) {
        this.direction = direction; // values: up, down, left, right based on key
      }
    }
  };

  // check self collision
  this.selfCollision = function (position) {
    return this.blocks.slice(0, -1).some((blockElement) => {
      let blockPosition = this.board.position.block(blockElement);

      return blockPosition.left == position.left && blockPosition.top == position.top;
    });
  };

  // check is position inside snake
  this.isInSnake = function (position) {
    return this.blocks.some((blockElement) => {
      let blockPosition = this.board.position.block(blockElement);

      return blockPosition.left == position.left && blockPosition.top == position.top;
    });
  };

  // add a block at position or tail
  this.addBlock = function (position) {
    let block;

    if (position) {
      // add to position
      block = this.board.block.add(this.type, position);
    } else {
      // add to tail
      let tailPosition = this.board.position.block(this.blocks.slice(-1)[0]);
      block = this.board.block.add(this.type, tailPosition);
    }

    this.blocks.push(block);
  };

  // move snake to direction
  this.move = function () {
    // return if snake length is 0
    if (!this.blocks.length) return false;

    // block size
    const blockSize = this.board.block.size;

    // get head position
    let position = this.board.position.block(this.blocks[0]);

    // move snake to new position
    switch (this.direction) {
      case 'up':
        position.top -= blockSize;
        break;

      case 'down':
        position.top += blockSize;
        break;

      case 'left':
        position.left -= blockSize;
        break;

      case 'right':
        position.left += blockSize;
        break;

      default:
        return false; // unknown key
    }

    // check if block is inside board
    // check if block is not inside snake
    if (this.board.position.isInBoard(position) && !this.selfCollision(position)) {
      // remove styles from previous head
      this.blocks[0].classList.remove(this.typeHead);

      // use tail as new head
      this.blocks.unshift(this.blocks.pop());

      // change tail position into new position
      this.board.block.move(this.blocks[0], position);

      // add styles to new head
      this.blocks[0].classList.add(this.typeHead);
      return true;
    }

    return false;
  };

  // check and eat apple
  this.checkApple = function (apple) {
    const applePosition = this.board.position.block(apple.block);
    const snakeHeadPos = this.board.position.block(this.blocks[0]);

    if (applePosition.left === snakeHeadPos.left && applePosition.top == snakeHeadPos.top) {
      // add snake length
      this.startLength++;

      apple.random(this.blocks);

      return true;
    }

    return false;
  };

  // render snake on board
  this.render = function (apple) {
    let isMoved = this.move();

    if (isMoved) {
      // check and eat apple
      this.checkApple(apple);

      // check start length
      this.addStartBlocks();
    }
  };

  // snake init
  // add snake head and styles
  this.addBlock(this.board.position.center());
  this.blocks[0].classList.add(this.typeHead);
}

export default Snake;
