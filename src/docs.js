if (__DEV__) {
  module.hot.accept();
}

// Documentation specific styles
import './docs.styl';

// Add any javascript here
if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
  var args = [
    '\n %c ✰ Slinky ✰ %c %c https://reactivepixels.github.io/get-slinky/ \n\n',
    'background: #D04945; color: #ffffff; padding:5px 0;',
    'background: #eeeeee; padding:5px 0;',
    'background: #404050; color: #ffffff; padding:5px 0;'
  ];

  console.log.apply(console, args); //jshint ignore:line
}
