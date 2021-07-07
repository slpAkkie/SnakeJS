'use strict'



// ==================================================
// Define constants

const MovementButtonsDirection = {
  'KeyA': 'left',
  'ArrowLeft': 'left',

  'KeyW': 'up',
  'ArrowUp': 'up',

  'KeyD': 'right',
  'ArrowRight': 'right',

  'KeyS': 'down',
  'ArrowDown': 'down',
}

const UI = {
  _score: document.querySelector( '.game-ui__value[data-name=score]' ),
  set score( value ) { UI._score.innerText = value },

  _eaten: document.querySelector( '.game-ui__value[data-name=eaten]' ),
  set eaten( value ) { UI._eaten.innerText = value },

  _duration: document.querySelector( '.game-ui__value[data-name=duration]' ),
  set duration( value ) { UI._duration.innerText = value },

  _speed: document.querySelector( '.game-ui__value[data-name=speed]' ),
  set speed( value ) { UI._speed.innerText = value },
}

const SETTINGS_UI = {
  themesContainer: document.querySelector( '.game-ui__options' ),

  getThemePanel: ( themeName, themeObj ) => createElement( `
    <div class="game-ui_option game-ui__color-picker" data-value="${themeName}">
      <div class="game-ui__colors">
        <div class="game-ui__color game-ui__color_primary" style="background-color: ${themeObj.snake.headColor}"></div>
        <div class="game-ui__color game-ui__color_secondary" style="background-color: ${themeObj.snake.bodyColor}"></div>
        <div class="game-ui__color game-ui__color_food" style="background-color: ${themeObj.food.color}"></div>
        <div class="game-ui__color game-ui__color_ground" style="background-color: ${themeObj.ground.color}"></div>
      </div>
    </div>`),
}

const GameoverPopup = {
  container: document.querySelector( '#js-gameover' ),
  restart: document.querySelector( '#js-again' ),

  _score: document.querySelector( '#js-score' ),
  set score( value ) { GameoverPopup._score.innerText = value },

  _eaten: document.querySelector( '#js-eaten' ),
  set eaten( value ) { GameoverPopup._eaten.innerText = value },

  _duration: document.querySelector( '#js-duration' ),
  set duration( value ) { GameoverPopup._duration.innerText = value },
}

const CANVAS_SIZE = { ...DEFAULTS.CANVAS_SIZE }
const GRID = {
  SIZE: DEFAULTS.GRID_SIZE,
  WIDTH: null,
  HEIGHT: null,
}
GRID.WIDTH = CANVAS_SIZE.WIDTH / GRID.SIZE
GRID.HEIGHT = CANVAS_SIZE.HEIGHT / GRID.SIZE



// ==================================================
// Initialize game data

let gameData = {
  speed: DEFAULTS.SPEED,
  speedAcceleration: DEFAULTS.SPEED_ACCELERATION,
  acceleration: DEFAULTS.ACCELERATION,
  maxAcceleration: DEFAULTS.MAX_ACCELERATION,
  increaseAcceleration: () => {
    gameData.acceleration += gameData.speedAcceleration
    gameData.acceleration = gameData.acceleration > gameData.maxAcceleration ? gameData.maxAcceleration : gameData.acceleration
  },
  getAcceleratedSpeed: () => gameData.speed - gameData.acceleration,
  getSpeedRatio: () => {
    let speed = ( Math.round( gameData.speed / gameData.getAcceleratedSpeed() * 1000 ) / 1000 ).toString(),
      decimalCount = speed.split( '.' )[ 1 ]?.length

    if ( !decimalCount ) speed = `${speed}.000`
    else if ( decimalCount < 3 ) speed = `${speed}00`
    else if ( decimalCount < 2 ) speed = `${speed}0`

    return speed
  },

  isStart: false,
  startedAt: null,
  isPaused: false,
  pausedAt: null,
  isGameover: false,
  getGameDuration: () => gameData.startedAt ? Date.now() - gameData.startedAt : 0,

  skin: config.skin,
  getSkin: () => SKINS[ gameData.skin ],

  updateTimeoutID: null,

  direction: DEFAULTS.DIRECTION,
  newDirection: DEFAULTS.DIRECTION,

  updateSkin: false,
}



// ==================================================
// Load Skins

loadSkins()
setSkin( gameData.skin, false )



// ==================================================
// Initialize game objects

let gameObjects = []

let player = new Snake( gameData.getSkin() )
let commonFood = new Food( gameData.getSkin() )

gameObjects.push( player )
gameObjects.push( commonFood )



// ==================================================
// Initialize canvas

const gameCanvas = document.querySelector( '#js-canvas' )
gameCanvas.width = CANVAS_SIZE.WIDTH
gameCanvas.height = CANVAS_SIZE.HEIGHT

const gameContext = gameCanvas.getContext( '2d' )



// ==================================================
// Event handlers

document.addEventListener( 'keydown', keydownHandler )

GameoverPopup.restart.addEventListener( 'click', restart )



// ==================================================
// Game start

gameData.updateTimeoutID = setTimeout( update, gameData.speed )
