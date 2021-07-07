'use strict';



/** ==================================================
 * Configuration */

/**
 * Game configuration (edit if you want customize game)
 *
 * @var {Object}
 */
const config = {};



/**
 * Game default configuration (Do not edit!!!)
 *
 * @var {Object}
 */
const defaults = {

  speed: 200,

  grid: {
    size: 20,
    width: 40,
    height: 40,
  },

  snake: {
    bodyColor: '#555555',
    headColor: '#222222',
  },

};



/** ==================================================
 * Define constants */

// Keys
const buttonCodes = {
  'a': 'left',
  'ф': 'left',
  'ArrowLeft': 'left',

  'w': 'up',
  'ц': 'up',
  'ArrowUp': 'up',

  'd': 'right',
  'в': 'right',
  'ArrowRight': 'right',

  's': 'down',
  'ы': 'down',
  'ArrowDown': 'down',
};

// Canvas
const appCanvas = document.querySelector( '#js-canvas' );
const appContext = appCanvas.getContext( '2d' );

// Size of game field
const fieldSize = {
  width: ( config?.grid?.size || defaults.grid.size ) * ( config?.grid?.width || defaults.grid.width ),
  height: ( config?.grid?.size || defaults.grid.size ) * ( config?.grid?.height || defaults.grid.height ),
}



/** ==================================================
 * Initialize game data */

appCanvas.width = fieldSize.width;
appCanvas.height = fieldSize.height;



// Set game objects
let Player = new Snake( config, defaults );



// In game data
let data = {
  nextFrameDirection: null,
  direction: null,
  speed: config?.speed || defaults.speed,
};

// Game timeout
let timeoutID = null;



/** ==================================================
 * Set Event handlers */

document.addEventListener( 'keydown', evt => data.nextFrameDirection = buttonCodes[ evt.key ] || null );
