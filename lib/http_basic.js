var handleError = require(__dirname + '/handle_error');

module.exports = exports = function(req, res, next) {
  var userPassEncoded = (req.headers.authorization || ' :').split(' ')[1];
  var userPassBuf = new Buffer(userPassEncoded, 'base64');
  var userPassSplit = userPassBuf.toString('utf8').split(':');
  req.auth = {
    username: userPassSplit[0],
    password: userPassSplit[1]
  };
  if (!(req.auth.username.length && req.auth.password.length)) {
    return handleError.unauthorized('authentication failed: ' +
        req.auth.username, res);
  }
  next();
};
