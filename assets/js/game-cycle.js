'use strict';



/**
 * Check new direction and update if it's possible
 *
 * @returns {void}
 */
function updateDirection() {
  if ( data.gameOver ) return;

  if ( data.nextFrameDirection === 'left' && data.direction !== 'right' || data.nextFrameDirection === 'right' && data.direction !== 'left' || data.nextFrameDirection === 'up' && data.direction !== 'down' || data.nextFrameDirection === 'down' && data.direction !== 'up' ) {
    if ( !data.direction ) {
      data.started = true;
      data.startedAt = Date.now();
    }
    data.direction = data.nextFrameDirection;
    data.nextFrameDirection = null;
  }
}



/**
 * Game over
 *
 * @returns {void}
 */
function gameOver() {
  gameOverPopup.container.classList.add( 'popup_shown' );
  gameOverPopup.score.innerText = Math.floor( ( player.eaten / data.speed * 150 ) * 1000 ) / 1000;
  gameOverPopup.eaten.innerText = player.eaten;
  gameOverPopup.duration.innerText = `${data.duration} секунд`;
}



/**
 * Start game again
 *
 * @returns {void}
 */
function playAgain() {
  gameOverPopup.container.classList.remove( 'popup_shown' );

  clearTimeout( data.forceSpeedTimeoutID );

  data.gameOver = false;

  data.direction = null;
  data.started = false;
  data.speed = data.initialSpeed;
  data.startedAt = null;

  player.resetState();
  food.calculateNewCoords();

  data.timeoutID = setTimeout( update, data.speed );
}



/**
 * Pause the game
 */
function pauseGame() {
  data.isPause = true;
  data.pausedAt = Date.now();
}

/**
 *
 */
function continueGame() {
  data.startedAt += Date.now() - data.pausedAt;
  data.isPause = false;
  data.pausedAt = null;
}



/**
 * Update frame
 *
 * @returns {void}
 */
function update() {
  if ( !data.isPause ) {
    updateDirection();

    appContext.fillStyle = '#20da80';
    appContext.fillRect( 0, 0, appCanvas.width, appCanvas.height )

    // Update and render Game objects
    player.update( data ).render( appContext );
    food.update( data ).render( appContext );

    // Update UI
    UI.score.innerText = Math.floor( ( player.eaten / data.speed * 150 ) * 1000 ) / 1000;
    UI.eaten.innerText = player.eaten;
    UI.duration.innerText = data.duration;
    UI.speed.innerText = Math.floor( data.initialSpeed / data.speed * 1000 ) / 1000;

    if ( data.started && data.speedForce ) data.forceSpeedTimeoutID = setTimeout( () => { data.speed = data.speed <= 50 ? data.speed : data.speed - data.speedForce }, data.forceTimeout );
  }

  if ( !data.gameOver ) data.timeoutID = setTimeout( update, data.speed );
  else gameOver();
}
