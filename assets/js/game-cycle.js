'use strict'



// ==================================================
// Game cycle functions

/**
 * Check if two directions are opposite
 *
 * @param {String} direction1
 * @param {String} direction2
 * @returns {Boolean}
 */
function isOppositeDirection( direction1, direction2 ) {
  return direction1 === 'left' && direction2 === 'right'
    || direction1 === 'right' && direction2 === 'left'
    || direction1 === 'up' && direction2 === 'down'
    || direction1 === 'down' && direction2 === 'up'
}

/**
 * Update direction if it's possible
 *
 * @returns {void}
 */
function updateDirection() {
  if ( !gameData.isStart ) {
    gameData.isStart = true
    gameData.startedAt = Date.now()
  }

  gameData.direction = gameData.newDirection
}

/**
 * Handle the gameover
 *
 * @returns {void}
 */
function gameover() {
  GameoverPopup.container.classList.add( 'popup_shown' )

  GameoverPopup.score = calculateScore( player.eaten, gameData.speed )
  GameoverPopup.eaten = player.eaten
  GameoverPopup.duration = timeFormat( gameData.getGameDuration() )

  gameData.acceleration = DEFAULTS.ACCELERATION

  gameData.isGameover = true
  gameData.isStart = false
  gameData.startedAt = null
  gameData.isPaused = false
  gameData.pausedAt = null

  gameData.direction = DEFAULTS.DIRECTION
  gameData.newDirection = DEFAULTS.DIRECTION
}

/**
 * Restarts game
 *
 * @returns {void}
 */
function restart() {
  GameoverPopup.container.classList.remove( 'popup_shown' )

  gameData.isGameover = false

  gameObjects.forEach( gObj => gObj.resetState() )
  updateUI()
}

/**
 * Pause the game
 *
 * @returns {void}
 */
function pauseGame() {
  gameData.isPaused = true
  gameData.pausedAt = Date.now()
}

/**
 * Continue the game after it has been paused
 *
 * @returns {void}
 */
function continueGame() {
  gameData.startedAt += Date.now() - gameData.pausedAt

  gameData.isPaused = false
  gameData.pausedAt = null
}

/**
 * Accelerate game speed
 *
 * @returns {void}
 */
function accelerateSpeed() {
  let newAcceleration = gameData.acceleration + gameData.speedAcceleration

  gameData.acceleration = gameData.speed - newAcceleration < 50 ? gameData.speed - 50 : newAcceleration
}

/**
 * Update UI information
 *
 * @returns {void}
 */
function updateUI() {
  UI.score = calculateScore()
  UI.eaten = player.eaten
  UI.duration = timeFormat( gameData.getGameDuration() )
  UI.speed = gameData.getSpeedRatio()
}

/**
 * Update game state
 *
 * @returns {void}
 */
function update() {
  if ( !gameData.isGameover ) {
    updateDirection()

    if ( !gameData.isPaused ) {
      gameObjects.forEach( gObj => gObj.update( gameData ) )

      if ( gameData.updateSkin ) {
        gameObjects.forEach( gObj => gObj.setSkin( gameData.getSkin() ) )
        gameData.updateSkin = false
      }

      gameData.isStart && updateUI()
    }
  }

  render()
  gameData.updateTimeoutID = setTimeout( update, gameData.speed - gameData.acceleration )
}

/**
 * Render all gameObjects
 */
function render() {
  gameContext.fillStyle = gameData.getSkin().ground.color
  gameContext.fillRect( 0, 0, gameCanvas.width, gameCanvas.height )

  gameObjects.forEach( gObj => gObj.render( gameContext ) )
}
