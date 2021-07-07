'use strict';



/** ==================================================
 * Configuration */

/**
 * Game configuration (edit if you want customize game)
 *
 * @var {Object}
 */
let config = {};



/**
 * Game default configuration (Do not edit!!!)
 *
 * @var {Object}
 */
const defaults = {

  speedForce: 0.1,
  forceInterval: 1000,

  grid: {
    size: 20,
    width: 40,
    height: 40,
  },

  snake: {
    bodyColor: '#555555',
    headColor: '#222222',
  },

  food: {
    color: '#ae4060',
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

// Game UI
const UI = {
  score: document.querySelector( '.game-ui__value[data-name=score]' ),
  eaten: document.querySelector( '.game-ui__value[data-name=eaten]' ),
  duration: document.querySelector( '.game-ui__value[data-name=duration]' ),
  speed: document.querySelector( '.game-ui__value[data-name=speed]' ),
};

const gameOverPopup = {
  container: document.querySelector( '#js-gameover' ),
  score: document.querySelector( '#js-score' ),
  eaten: document.querySelector( '#js-eaten' ),
  duration: document.querySelector( '#js-duration' ),

  again: document.querySelector( '#js-again' ),
};

// Canvas
const appCanvas = document.querySelector( '#js-canvas' );
const appContext = appCanvas.getContext( '2d' );

// Size of game field
const cellSize = config?.grid?.size || defaults.grid.size;

const gridSize = {
  rows: config?.grid?.height || defaults.grid.height,
  cols: config?.grid?.width || defaults.grid.width,
};

const fieldSize = {
  width: cellSize * gridSize.cols,
  height: cellSize * gridSize.rows,
};



/** ==================================================
 * Initialize game data */

appCanvas.width = fieldSize.width;
appCanvas.height = fieldSize.height;



// Set game objects
const player = new Snake( config.snake, defaults.snake );
const food = new Food( config.food, defaults.food );



// In game data
let data = {
  isPause: false,
  pausedAt: null,
  started: false,
  startedAt: null,

  get duration() {
    return data.startedAt ? Math.floor( ( Date.now() - data.startedAt ) / 100 ) / 10 : 0;
  },

  timeoutID: null,

  initialSpeed: 200,
  speed: null,

  speedForce: config?.speedForce || defaults.speedForce,
  forceTimeoutl: config?.forceTimeout || defaults.forceTimeout,
  forceSpeedTimeoutID: null,

  nextFrameDirection: null,
  direction: null,

  gameOver: false,
};

data.speed = config?.speed || data.initialSpeed;



/** ==================================================
 * Set Event handlers */

document.addEventListener( 'keydown', evt => data.nextFrameDirection = buttonCodes[ evt.key ] || null );
document.addEventListener( 'keydown', evt => {
  if ( evt.key === 'Escape' ) {
    if ( data.isPause ) continueGame();
    else pauseGame();
  }
} );

gameOverPopup.again.addEventListener( 'click', playAgain );



/** ==================================================
 * Start game cycle */

data.timeoutID = setTimeout( update, data.speed );
