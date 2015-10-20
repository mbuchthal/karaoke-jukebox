var qr = require('qr-image');
var fs = require('fs');

//type can be svg, png, eps and pdf
//correction can be L (7%), M (15%), Q (25%), or H (30%) image damage
module.exports = function(input, type, outputName, correction) {
  if (!input) {
    return console.log('no input detecting, stopping qr encode');
  }

  if (!type) {
    type = 'pdf';
  }

  if (!outputName) {
    outputName = 'output';
  }

  if (!correction) {
    correction = 'Q';
  }

  var options = {
    type: type,
    ec_level: correction
  };

  qr.image(input, options)
    .pipe(fs.createWriteStream(outputName + '.' + type));
};

