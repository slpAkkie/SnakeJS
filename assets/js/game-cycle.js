'use strict';



let timeoutID = null;



/**
 * Update frame
 *
 * @returns {void}
 */
function update() {
  appContext.clearRect( 0, 0, appCanvas.width, appCanvas.height )

  gameObjects.forEach( gObj => gObj.update( data ) );
  gameObjects.forEach( gObj => gObj.render( appContext ) );

  timeoutID = setTimeout( update, config.speed || defaults.speed );
}

timeoutID = setTimeout( update, config.speed || defaults.speed );
