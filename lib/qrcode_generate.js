var qr = require('qr-image');
var fs = require('fs');

//type can be svg, png, eps and pdf
module.exports = function(input, type, outputName) {
  if (!input) {
    return console.log('no input detecting, stopping qr encode');
  }

  if(!type) {
    type = 'pdf';
  }

  if(!outputName) {
    outputName = 'output';
  }

  var options = {
    type: type,
    ec_level: 'Q' //support up to 25% image damage
  };

  var qrEncode = qr.image(input, options)
    .pipe(fs.createWriteStream(outputName + '.' + type));
};

