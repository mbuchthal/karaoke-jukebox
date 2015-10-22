var express = require('express');
var users = require(__dirname + '/../models/user');
var uuid = require('node-uuid');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var createQR = require(__dirname + '/../lib/qrcode_generate');
var socketServer = require(__dirname + '/../sockets/base')();

var usersRouter = module.exports = exports = express.Router();

usersRouter.get('/user', function(req, res) {
  var user = {
    id: req.headers.id || uuid.v4(),
    nick: decodeURIComponent(req.headers.nick || 'Guest'),
    expiry: req.headers.expiry || null
  };
  users.add(user);
  if (!users.isExpired(user)) {
    socketServer.acceptUser(user);
    return res.status(202).json({id: user.id, nick: user.nick});
  }
  var qrIdString = createQR(user.id, 'svg');
  res.status(202).json({id: user.id, nick: user.nick, QR: qrIdString});
});

usersRouter.patch('/user', jsonParser, function(req, res) {
  var userID = req.headers.id;
  if (!users.exists(userID)) {
    return handleError.unauthorized('unauthorized: ' + req.headers.id, res);
  }
  users.changeNick(req.headers.id, decodeURIComponent(req.body.nick));
  res.status(200).json(users.getUser(req.headers.id));
});
