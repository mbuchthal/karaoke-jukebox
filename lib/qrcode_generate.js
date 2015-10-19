var qr = require('qr-image');
var fs = require('fs');

module.exports = function(input) {

  function file(name) {
    return fs.createWriteStream(__dirname + '/' + name);
  }

  qr.image(input, {
    type: 'svg',
    ec_level: 'Q' //support up to 25% image damage
  }).pipe(file(qr.svg));
};
