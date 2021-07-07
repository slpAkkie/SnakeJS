'use strict';



/**
 * Check new direction and update if it's possible
 */
function updateDirection() {
  if (
    data.nextFrameDirection === 'left' && data.direction !== 'right' ||
    data.nextFrameDirection === 'right' && data.direction !== 'left' ||
    data.nextFrameDirection === 'up' && data.direction !== 'down' ||
    data.nextFrameDirection === 'down' && data.direction !== 'up'
  ) {
    data.direction = data.nextFrameDirection;
    data.nextFrameDirection = null;
  }
}



/**
 * Update frame
 *
 * @returns {void}
 */
function update() {
  updateDirection();

  appContext.clearRect( 0, 0, appCanvas.width, appCanvas.height )

  Player.update( data ).render( appContext );

  timeoutID = setTimeout( update, data.speed );
}

timeoutID = setTimeout( update, data.speed );
