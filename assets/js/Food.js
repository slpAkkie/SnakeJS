'use strict';



class Food {

    /**
     * @var {Object}
     */
    #coords = {
        x: null,
        y: null,
    };

    get coords() {
        return this.#coords;
    };

    /**
     * @var {Number}
     */
    #size;

    /**
     * @var {String}
     */
    #color;

    /**
     * Create a Food object
     *
     * @param {Object} param0
     */
    constructor( food, defaults ) {
        this.#size = cellSize;
        this.#color = food?.color || defaults.color;

        this.calculateNewCoords();
    }

    /**
     * Change the food's skin
     *
     * @param {Object} skin
     *
     * @returns {void}
     */
    changeSkin( skin ) {
        this.#color = skin?.color || defaults.color;
    }

    /**
     * Calculate new coords to respawn new food
     *
     * @returns {void}
     */
    calculateNewCoords() {
        do {
            this.#coords.x = Math.round( Math.random() * ( gridSize.cols - 1 ) ) * cellSize;
            this.#coords.y = Math.round( Math.random() * ( gridSize.rows - 1 ) ) * cellSize;
        } while ( this.checkCollisionWithPlayer() );
    }

    /**
     * Check if spawn in player body
     *
     * @returns {Boolean}
     */
    checkCollisionWithPlayer() {
        return player.checkCollisionWith( this );
    }

    /**
     * Update food state
     *
     * @param {Array} data In game data
     *
     * @returns {void}
     */
    update( data ) {
        return this;
    }

    /**
     * Render food into canvas
     *
     * @param {CanvasRenderingContext2D} canvasContext
     *
     * @returns {void}
     */
    render( canvasContext ) {
        canvasContext.fillStyle = this.#color;
        canvasContext.fillRect(
            this.#coords.x,
            this.#coords.y,
            this.#size,
            this.#size
        );
    }

}
