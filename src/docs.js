if (__DEV__) {
  module.hot.accept();
}

// Documentation specific styles
import './docs.styl';

// Add any javascript here
if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
  var args = [
    '\n %c ✰ Swanky Docs ✰ %c https://swanky-docs.github.io %c \n\n',
    'background: #FF5A60; color: #ffffff; padding:5px 0;',
    'background: #9FCDDC; color: #ffffff; padding:5px 0;',
    'background: #42434F; color: #ffffff; padding: 5px 0;'
  ];

  console.log.apply(console, args); //jshint ignore:line
}