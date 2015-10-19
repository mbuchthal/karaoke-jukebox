var qr = require('qr-image');
var fs = require('fs');

module.exports = function(input, type) {
  var qrEncode = qr.image(input, { type: type, ec_level: 'Q' })
    .pipe(fs.createWriteStream('output.' + type));
};
