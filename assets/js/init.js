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

  gridSize: 20,
  speed: 200,

  snake: {
    bodyColor: '#555555',
    headColor: '#222222',
  },

  canvas: {
    width: 800,
    height: 800,
  },

};



/** ==================================================
 * Initialize game data */



// Canvas
const appCanvas = document.querySelector( '#js-canvas' );
const appContext = appCanvas.getContext( '2d' );

appCanvas.width = config.canvas?.width || defaults.canvas.width;
appCanvas.height = config.canvas?.height || defaults.canvas.height;

function getFieldSize() {
  return {
    width: appCanvas.width,
    height: appCanvas.height,
  };
}



// Create Snake object
const player = new Snake( config, defaults );

// Set game objects
let gameObjects = [
  player
];



// In game data
let data = {
  direction: null,
};

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



/** ==================================================
 * Set Event handlers */

document.addEventListener( 'keydown', ( evt ) => {
  let direction = buttonCodes[ evt.key ];

  if (
    direction === 'left' && data.direction === 'right' ||
    direction === 'right' && data.direction === 'left' ||
    direction === 'up' && data.direction === 'down' ||
    direction === 'down' && data.direction === 'up'
  ) return;

  if ( direction ) data.direction = direction;
} );
