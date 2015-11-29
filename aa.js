var h = require('./test/helpers');

var same = h.isCopyOf('./test', './test');
console.log('are they the same?');
console.log(same ? 'yes' : 'no');
