var eat = require('eat');
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/handle_error');

module.exports = exports = function(req, res, next) {
  var encryptedToken = req.headers.token ||
      (req.body ? req.body.token : undefined);
  if (!encryptedToken) {
    return handleError.unauthorized(null, res);
  }
  eat.decode(encryptedToken, process.env.APP_SECRET, function(err, token) {
    if (err) { return handleError.internalServerError(err, res); }

    User.findOne({_id: token.id}, function(err, user) {
      if (err) { return handleError.internalServerError(err, res); }
      if (!user) { return handleError.unauthorized(null, res); }
      req.user = user;
      next();
    });
  });
};
