function Snake(board, startLength = 4, direction = 'ArrowLeft', keys) {
  // board
  this.board = board;

  // snake block elements
  this.blocks = [];

  // snake start length
  this.startLength = startLength;

  // snake direction
  this.direction = direction;

  // snake blocks class name
  this.type = board.block.types.snake;
  this.typeHead = board.block.types.snakeHead;

  // score
  this.score = startLength;

  // is snake win
  this.isWin = false;

  // is snake dead
  this.isDead = false;

  // keys for control snake
  this.keys = keys ?? {
    up: ['ص', 'w', '8', 'ArrowUp'],
    down: ['س', 's', '2', 'ArrowDown'],
    left: ['ش', 'a', '4', 'ArrowLeft'],
    right: ['ی', 'd', '6', 'ArrowRight'],
  };

  // fix: reverse movement
  this.directions = {
    x: ['left', 'right'],
    y: ['up', 'down'],
  };

  // functions
  // add start tail
  this.addStartLength = function () {
    if (this.startLength > 0) {
      this.addSnakeBody();
      this.startLength--;
    }
  };

  // set direction
  this.setDirection = function (key) {
    let nextDirection;

    // set direction of key
    for (const direction in this.keys) {
      if (this.keys[direction].includes(key)) {
        nextDirection = direction; // direction: up, down, left, right
      }
    }

    // invalid key
    if (!nextDirection) return;

    // fix: reverse movement
    // if both key is in x or both in y direction ignore it
    let reverseMovement = [
      this.directions.x.includes(this.direction) && this.directions.x.includes(nextDirection),
      this.directions.y.includes(this.direction) && this.directions.y.includes(nextDirection),
    ];

    if (reverseMovement.includes(true)) return;

    // set direction
    this.direction = nextDirection;
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
  this.addSnakeBody = function (position) {
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
        return false; // invalid key
    }

    // check if block is inside board
    // check if block is not inside snake
    if (this.board.position.isInBoard(position) && !this.selfCollision(position)) {
      // check start length
      this.addStartLength();

      // remove styles from previous head
      this.blocks[0].classList.remove(this.typeHead);

      // use tail as new head
      this.blocks.unshift(this.blocks.pop());

      // change tail position into new position
      this.board.block.move(this.blocks[0], position);

      // add styles to new head
      this.blocks[0].classList.add(this.typeHead);

      return true;
    } else {
      this.isDead = true;
    }

    return false;
  };

  // check and eat apple
  this.checkApple = function (apple) {
    const applePosition = this.board.position.block(apple.block);
    const snakeHeadPos = this.board.position.block(this.blocks[0]);

    if (applePosition.left === snakeHeadPos.left && applePosition.top === snakeHeadPos.top) {
      // add snake length
      this.startLength++;

      // mode apple to random position
      apple.random(this.blocks);

      return true;
    }

    return false;
  };

  // check if snake win
  this.checkWin = function () {
    if (this.blocks.length >= this.board.columns * this.board.rows) {
      this.isWin = true;
    }
  };

  // render snake on board
  this.render = function (apple) {
    const isSnakeMoved = this.move();

    // check if snake win
    this.checkWin();

    if (isSnakeMoved) {
      // check and eat apple
      this.checkApple(apple);
    }
  };

  // snake init
  // add snake head and styles
  this.addSnakeBody(this.board.position.center());
  this.blocks[0].classList.add(this.typeHead);
}

export default Snake;
