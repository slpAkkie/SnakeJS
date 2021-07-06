'use strict';



// Initialize game data
const appCanvas = document.querySelector( '#js-canvas' );
const appContext = appCanvas.getContext( '2d' );

appCanvas.width = 800;
appCanvas.height = 800;

appContext.fillRect( 0, 0, 100, 100 );
