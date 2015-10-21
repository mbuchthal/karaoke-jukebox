var qr = require('qr-image');

//type can be svg, png, eps and pdf
module.exports = function(input, type) {
  if (!input) {
    return console.log('no input detecting, stopping qr encode');
  }

  if (!type) {
    type = 'svg';
  }

  var options = {
    type: type,
    ec_level: 'Q' //support up to 25% image damage
  };

  return qr.imageSync(input, options);
};

