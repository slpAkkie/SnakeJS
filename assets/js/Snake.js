'use strict';



// Snake is a character controlled by the player
class Snake {

  /**
   * Array of body's parts coords
   *
   * @var {Array}
   */
  #body = [];

  /**
   * @var {Number}
   */
  #bodySize;

  /**
   * @var {String}
   */
  #bodyColor;

  /**
   * @var {String}
   */
  #headColor;

  /**
   * @var {Number}
   */
  #startWithLength = 3;

  /**
   * @var {Number}
   */
  #startLength = 0;

  /**
   * How much snake ate
   */
  eaten = 0;



  /**
   * @var {Number}
   */
  get length() { return this.#body.length }

  /**
   * @var {Number}
   */
  get lastBodyIndex() { return this.length - 1 }



  /**
   * Create a Snake object
   *
   * @param {Object} param0
   */
  constructor( snake, defaults ) {
    this.#bodyColor = snake?.bodyColor || defaults.bodyColor;
    this.#headColor = snake?.headColor || defaults.headColor;

    this.#bodySize = cellSize;

    this.#body.push( {
      x: fieldSize.width / 2,
      y: fieldSize.height / 2,
    } );
  }

  /**
   * Change the snake's skin
   *
   * @param {Object} skin
   *
   * @returns {void}
   */
  changeSkin( skin ) {
    this.#bodyColor = skin?.bodyColor || defaults.bodyColor;
    this.#headColor = skin?.headColor || defaults.headColor;
  }

  /**
   * Check if coords into snake's body
   *
   * @param {Object} coords1
   * @param {Object} coords2
   *
   * @returns {Boolean}
   */
  checkCollisionWithCoords( coords1, coords2 ) {
    return coords1.x === coords2.x && coords1.y === coords2.y;
  }

  /**
   * Check if coords is in snake body
   *
   * @param {Object} gameObject
   *
   * @returns {Boolean}
   */
  checkCollisionWith( gameObject ) {
    return this.#body.some( bodyPart => this.checkCollisionWithCoords( bodyPart, gameObject.coords ) );
  }

  /**
   * Check if snake ate yourself
   *
   * @returns {Boolean}
   */
  checkAteYourself() {
    for ( let i = 4; i < this.length; i++ )
      if ( this.checkCollisionWithCoords( this.#body[ 0 ], this.#body[ i ] ) ) return true;

    return false;
  }

  /**
   * Reset snake to the initial state
   *
   * @returns {void}
   */
  resetState() {
    this.#body = [ {
      x: fieldSize.width / 2,
      y: fieldSize.height / 2,
    } ];

    this.#startLength = 0;

    this.eaten = 0;
  }

  /**
   * Eat the food and grow
   *
   * @returns {void}
   */
  eat() {
    this.#body.push( this.#body[ this.lastBodyIndex ] );
    this.eaten++;
    food.calculateNewCoords();
  }

  /**
   * Update snake state
   *
   * @param {Array} data In game data
   *
   * @returns {void}
   */
  update( data ) {
    // Calculate coords for new body part
    let newHeadCoords = {
      x: this.#body[ 0 ].x + this.#getXDirection( data.direction ) * this.#bodySize,
      y: this.#body[ 0 ].y + this.#getYDirection( data.direction ) * this.#bodySize,
    };

    // Check if it will be go out of the game field
    if ( newHeadCoords.x < 0 )
      newHeadCoords.x = fieldSize.width - this.#bodySize;
    if ( newHeadCoords.x + this.#bodySize > fieldSize.width )
      newHeadCoords.x = 0;
    if ( newHeadCoords.y < 0 )
      newHeadCoords.y = fieldSize.height - this.#bodySize;
    if ( newHeadCoords.y + this.#bodySize > fieldSize.height )
      newHeadCoords.y = 0;

    // Add new part to the front and pop the last one
    this.#body.unshift( newHeadCoords );
    if ( this.checkCollisionWith( food ) ) this.eat();

    if ( this.#startLength < this.#startWithLength ) this.#startLength++;
    else this.#body.pop();

    if ( this.checkAteYourself() ) data.gameOver = true;

    return this;
  }

  /**
   * Get X direction ratio
   *
   * @param {String} direction
   * @returns {Number}
   */
  #getXDirection( direction ) {
    if ( direction === 'left' ) return -1;
    else if ( direction === 'right' ) return 1;

    return 0;
  }

  /**
   * Get Y direction ratio
   *
   * @param {String} direction
   * @returns {Number}
   */
  #getYDirection( direction ) {
    if ( direction === 'up' ) return -1;
    else if ( direction === 'down' ) return 1;

    return 0;
  }

  /**
   * Render snake into canvas
   *
   * @param {CanvasRenderingContext2D} canvasContext
   *
   * @returns {void}
   */
  render( canvasContext ) {
    for ( let i = this.lastBodyIndex; i >= 0; i-- ) {
      canvasContext.fillStyle = this.#bodyColor;
      if ( i === 0 ) canvasContext.fillStyle = this.#headColor;

      let bodyPart = this.#body[ i ];

      canvasContext.fillRect(
        bodyPart.x,
        bodyPart.y,
        this.#bodySize,
        this.#bodySize,
      );
    }

  }

}
