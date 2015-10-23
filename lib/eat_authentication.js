var eat = require('eat');
var Admin = require(__dirname + '/../models/admin');
var handleError = require(__dirname + '/handle_error');

module.exports = exports = function(req, res, next) {
  var encryptedToken = req.headers.token || 
      (req.headers.cookie ? decodeURIComponent(req.headers.cookie.slice(6)) : '') ||
      (req.body ? req.body.token : undefined);
  if (!encryptedToken) {
    return handleError.unauthorized(null, res);
  }
  eat.decode(encryptedToken, process.env.APP_SECRET, function(err, token) {
    if (err) { return handleError.internalServerError(err, res); }

    Admin.findOne({_id: token.id}, function(err, admin) {
      if (err) { return handleError.internalServerError(err, res); }
      if (!admin) { return handleError.unauthorized(null, res); }
      req.admin = admin;
      next();
    });
  });
};
