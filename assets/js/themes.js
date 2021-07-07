'use strict';



/** ==================================================
 * Define themes */

const themes = {
  gray: {
    snake: {
      bodyColor: '#555555',
      headColor: '#222222',
    },

    food: {
      color: '#ae4060',
    },
  },
  blue: {
    snake: {
      bodyColor: '#5566f5',
      headColor: '#223382',
    },

    food: {
      color: '#195bff',
    },
  },
};



/** ==================================================
 * Theme changer */

function changeTheme() {
  player.changeSkin( themes[ this.dataset.value ].snake );
  food.changeSkin( themes[ this.dataset.value ].food );
}

document.querySelectorAll( '.game-ui__color-picker' ).forEach( el => el.addEventListener( 'click', changeTheme ) )
