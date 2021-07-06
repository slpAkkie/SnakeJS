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
   * Create a Snake object
   *
   * @param {Object} param0
   */
  constructor( { snake, gridSize }, defaults ) {
    this.#bodyColor = snake?.bodyColor || defaults.snake.bodyColor;
    this.#headColor = snake?.headColor || defaults.snake.headColor;

    this.#bodySize = gridSize || defaults.gridSize;

    this.#body.push( {
      x: getFieldSize().width / 2,
      y: getFieldSize().height / 2,
    } );
  }

  /**
   * Update snake state
   *
   * @param {Array} data In game project
   *
   * @returns {void}
   */
  update( data ) {
    let newHeadCoords = {
      x: this.#body[ 0 ].x + this.#getXDirection( data.direction ) * this.#bodySize,
      y: this.#body[ 0 ].y + this.#getYDirection( data.direction ) * this.#bodySize,
    };

    if ( newHeadCoords.x < 0 )
      newHeadCoords.x = getFieldSize().width - this.#bodySize;
    if ( newHeadCoords.x + this.#bodySize > getFieldSize().width )
      newHeadCoords.x = this.#bodySize;
    if ( newHeadCoords.y < 0 )
      newHeadCoords.y = getFieldSize().height - this.#bodySize;
    if ( newHeadCoords.y + this.#bodySize > getFieldSize().height )
      newHeadCoords.y = this.#bodySize;

    this.#body.unshift( newHeadCoords );
    this.#body.pop();
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

    canvasContext.fillStyle = this.#headColor;

    this.#body.forEach( bodyPart => {
      canvasContext.fillRect(
        bodyPart.x,
        bodyPart.y,
        this.#bodySize,
        this.#bodySize,
      );

      canvasContext.fillStyle = this.#bodyColor;
    } );

  }

}
