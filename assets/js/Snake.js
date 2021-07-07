'use strict'



// Snake is a character controlled by the player
class Snake {

  /**
   * Array of body's parts coords
   *
   * @var {Array}
   */
  #body

  /**
   * @var {Object}
   */
  #newTailPart

  /**
   * @var {Number}
   */
  #bodySize

  /**
   * @var {String}
   */
  #bodyColor

  /**
   * @var {String}
   */
  #headColor

  /**
   * @var {Number}
   */
  #startWithLength = 3

  /**
   * @var {Number}
   */
  #startLength = 0

  /**
   * How much snake ate
   */
  eaten = 0



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
  constructor( skin ) {
    this.setSkin( skin )

    this.#bodySize = GRID.SIZE

    this.resetState()
  }

  /**
   * Change the snake's skin
   *
   * @param {Object} skin
   *
   * @returns {void}
   */
  setSkin( { snake } ) {
    this.#headColor = snake.headColor
    this.#bodyColor = snake.bodyColor
  }

  /**
   * Check if coords has collision with provided coords
   *
   * @param {Object} coords
   *
   * @returns {Boolean}
   */
  checkCollisionWithCoords( coords ) {
    return this.#body.some( bodyPart => bodyPart.x === coords.x && bodyPart.y === coords.y )
  }

  /**
   * Check if head coords has collision with provided coords
   *
   * @param {Object} coords
   *
   * @returns {Boolean}
   */
  checkCollisionHeadWithCoords( coords ) {
    return this.#body[ 0 ].x === coords.x && this.#body[ 0 ].y === coords.y
  }

  /**
   * Check if it's object has collision with provided gameObject
   *
   * @param {Object} gameObject
   *
   * @returns {Boolean}
   */
  checkCollisionWith( gameObject ) {
    let collision = false

    if ( gameObject instanceof Snake ) collision = this.checkAteYourself()
    else collision = this.checkCollisionWithCoords( gameObject.getCoords() )

    return collision
  }

  /**
   * Check if snake ate yourself
   *
   * @returns {Boolean}
   */
  checkAteYourself() {
    for ( let i = 4; i < this.length; i++ )
      if ( this.checkCollisionHeadWithCoords( this.#body[ i ] ) ) return true

    return false
  }

  /**
   * Reset snake to the initial state
   *
   * @returns {void}
   */
  resetState() {
    this.#body = [ getCenterCoords() ]
    this.#newTailPart = getCenterCoords()

    this.#startLength = 0

    this.eaten = 0
  }

  /**
   * Eat the food and grow
   *
   * @returns {void}
   */
  eat( food ) {
    this.eaten++
    this.#body.push( this.#newTailPart )

    food.calculateNewCoords()

    gameData.increaseAcceleration()
  }

  /**
   * Update snake state
   *
   * @param {Array} data In game data
   *
   * @returns {void}
   */
  update( gameData ) {
    let newHeadCoords = {
      x: this.#body[ 0 ].x + this.#getXDirectionRatio( gameData.direction ) * this.#bodySize,
      y: this.#body[ 0 ].y + this.#getYDirectionRatio( gameData.direction ) * this.#bodySize,
    }

    if ( newHeadCoords.x < 0 ) newHeadCoords.x = CANVAS_SIZE.WIDTH - this.#bodySize
    if ( newHeadCoords.x + this.#bodySize > CANVAS_SIZE.WIDTH ) newHeadCoords.x = 0
    if ( newHeadCoords.y < 0 ) newHeadCoords.y = CANVAS_SIZE.HEIGHT - this.#bodySize
    if ( newHeadCoords.y + this.#bodySize > CANVAS_SIZE.HEIGHT ) newHeadCoords.y = 0

    this.#body.unshift( newHeadCoords )

    if ( this.#startLength < this.#startWithLength ) this.#startLength++
    else this.#newTailPart = this.#body.pop()

    let collisionWith = checkCollision( this )
    if ( collisionWith instanceof Food ) this.eat( collisionWith )
    else if ( collisionWith instanceof Snake ) gameover()

    return this
  }

  /**
   * Get X direction ratio
   *
   * @param {String} direction
   * @returns {Number}
   */
  #getXDirectionRatio( direction ) {
    if ( direction === 'left' ) return -1
    else if ( direction === 'right' ) return 1

    return 0
  }

  /**
   * Get Y direction ratio
   *
   * @param {String} direction
   * @returns {Number}
   */
  #getYDirectionRatio( direction ) {
    if ( direction === 'up' ) return -1
    else if ( direction === 'down' ) return 1

    return 0
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
      canvasContext.fillStyle = this.#bodyColor
      if ( i === 0 ) canvasContext.fillStyle = this.#headColor

      let bodyPart = this.#body[ i ]

      canvasContext.fillRect(
        bodyPart.x,
        bodyPart.y,
        this.#bodySize,
        this.#bodySize,
      )
    }

  }

}
