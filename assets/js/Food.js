'use strict'



class Food {

  /**
   * Object coords
   *
   * @var {Object}
   */
  #coords = {
    x: null,
    y: null,
  }

  /**
   * @var {Object}
   */
  getCoords() {
    return this.#coords
  }

  /**
   * Object size
   *
   * @var {Number}
   */
  #size

  /**
   * Object color
   *
   * @var {String}
   */
  #color

  /**
   * Create a Food object
   *
   * @param {Object} food
   */
  constructor( skin ) {
    this.#size = GRID.SIZE
    this.setSkin( skin )

    this.resetState()
  }

  /**
   * Change skin
   *
   * @param {Object} skin
   * @returns {void}
   */
  setSkin( { food } ) {
    this.#color = food.color
  }

  /**
   * Reset food to the initial state
   *
   * @returns {void}
   */
  resetState() {
    this.calculateNewCoords()
  }

  /**
   * Calculate new coords
   *
   * @returns {void}
   */
  calculateNewCoords() {
    do {
      this.#coords.x = getRandomXCoord()
      this.#coords.y = getRandomYCoord()
    } while ( checkCollision( this ) instanceof Snake )
  }

  /**
   * Check if coords has collision with provided coords
   *
   * @param {Object} coords
   * @returns {Boolean}
   */
  checkCollisionWithCoords( coords ) {
    return coords.x === this.getCoords().x && coords.y === this.getCoords().y
  }

  /**
   * Check if it's object has collision with provided gameObject
   *
   * @param {Object} gameObject
   * @returns {Boolean}
   */
  checkCollisionWith( gameObject ) {
    return gameObject.checkCollisionWithCoords( this.getCoords() )
  }

  /**
   * Update food state
   *
   * @param {Array} data In game data
   *
   * @returns {void}
   */
  update( data ) { return this }

  /**
   * Render food into canvas
   *
   * @param {CanvasRenderingContext2D} canvasContext
   *
   * @returns {void}
   */
  render( canvasContext ) {
    canvasContext.fillStyle = this.#color
    canvasContext.fillRect(
      this.#coords.x,
      this.#coords.y,
      this.#size,
      this.#size
    )
  }

}
