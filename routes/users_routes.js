var express = require('express');
var users = require(__dirname + '/../lib/user');
var uuid = require('node-uuid');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');

var usersRouter = module.exports = exports = express.Router();

usersRouter.get('/user', function(req, res) {
  var user = {
    id: req.headers.id || uuid.v4(),
    nick: req.headers.nick || 'Guest',
    accepted: false
  };
  users.add(user);
  res.status(202).json({id: user.id, nick: user.nick});
});

usersRouter.patch('/user', jsonParser, function(req, res) {
  if (!(users.exists(req.headers.id))) {
    return handleError.unauthorized('unauthorized: ' + req.headers.id, res);
  }
  users.changeNick(req.headers.id, req.body.nick);
  res.status(200).json(users.getUser(req.headers.id));
});
