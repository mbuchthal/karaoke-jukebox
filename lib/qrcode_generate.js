var qr = require('qr-image');

//type can be svg, png, eps and pdf
//correction can be L (7%), M (15%), Q (25%), or H (30%) image damage
module.exports = function(input, type, correction) {
  if (!input) {
    return console.log('no input detecting, stopping qr encode');
  }

  if (!type) {
    type = 'svg';
  }

  if (!correction) {
    correction = 'Q';
  }

  var options = {
    type: type,
    ec_level: correction
  };

  return qr.imageSync(input, options);
};

