'use strict'



// ==================================================
// General functions

/**
 * Format miliseconds into time string
 *
 * @param {Number} ms Miliseconds
 * @returns {String}
 */
function timeFormat( ms ) {
  if ( typeof ms !== 'number' ) return '00:00:000'

  let minutes = Math.floor( ms / 60000 )
  ms -= minutes * 60000

  let seconds = Math.floor( ms / 1000 )
  ms -= seconds * 1000

  minutes = minutes.toString()
  seconds = seconds.toString()

  if ( minutes.length < 2 ) minutes = `0${minutes}`
  else minutes = `${minutes}`

  if ( seconds.length < 2 ) seconds = `0${seconds}`
  else seconds = `${seconds}`

  return `${minutes}:${seconds}`
}

/**
 * Get direction corresponding to the pressed button
 *
 * @param {String} code KeyCode
 * @returns {String|null}
 */
function getDirectionByCode( code ) { return MovementButtonsDirection[ code ] || null }

/**
 * Handle keydown event
 *
 * @param {Event} evt
 */
function keydownHandler( evt ) {
  if ( gameData.isStart && evt.key === 'Escape' ) gameData.isPaused ? continueGame() : pauseGame()
  else if ( !gameData.isGameover && !gameData.isPaused ) {
    let pressedDirection = getDirectionByCode( evt.code )
    gameData.newDirection = pressedDirection && !isOppositeDirection( pressedDirection, gameData.direction ) && pressedDirection !== gameData.direction ? pressedDirection : gameData.newDirection
  } else if ( gameData.isGameover && ( evt.code === 'Space' || evt.code === 'Enter' ) ) GameoverPopup.restart.click()
}

/**
 * Calculate how many points the player has scored
 *
 * @param {Number} eaten
 * @param {Number} speed
 * @returns {Number}
 */
function calculateScore() {
  return Math.floor( gameData.acceleration * player.eaten )
}

/**
 * Get random X coord
 *
 * @returns {Number}
 */
function getRandomXCoord() {
  return Math.round( Math.random() * ( GRID.WIDTH - 1 ) ) * GRID.SIZE
}

/**
 * Get random Y coord
 *
 * @returns {Number}
 */
function getRandomYCoord() {
  return Math.round( Math.random() * ( GRID.HEIGHT - 1 ) ) * GRID.SIZE
}

/**
 * Get coords of the center of the game field
 *
 * @returns {Object}
 */
function getCenterCoords() {
  return {
    x: ( GRID.WIDTH / 2 - 1 ) * GRID.SIZE,
    y: ( GRID.HEIGHT / 2 - 1 ) * GRID.SIZE,
  }
}

/**
 * Check if Object has collision with some other
 *
 * @param {Object} gameObject
 */
function checkCollision( gameObject ) {
  return gameObjects.find( gameObject2 => gameObject.checkCollisionWith( gameObject2 ) )
}

function createElement( markup ) {
  let template = document.createElement( 'template' )
  template.innerHTML = markup.trim()

  return template.content.firstChild
}

/**
 * Apply skin settings
 *
 * @param {String} skinName
 */
function setSkin( skinName, rewriteOldSkin = true ) {
  gameData.skin = skinName = SKINS[ skinName ] ? skinName : DEFAULTS.SKIN
  let skin = SKINS[ skinName ]

  gameData.updateSkin = rewriteOldSkin

  document.querySelector( '#js-style' ).innerText = `.popup { background-color: ${skin.snake.headColor}bf }`
}

/**
 * Handle skin choice
 */
function loadSkins() {
  Object.keys( SKINS ).forEach( skinName => {
    SETTINGS_UI.themesContainer.appendChild( SETTINGS_UI.getThemePanel( skinName, SKINS[ skinName ] ) )
  } )

  document.querySelectorAll( '.game-ui__color-picker' ).forEach( el => el.addEventListener( 'click', () => setSkin( el.dataset.value ) ) )
}
