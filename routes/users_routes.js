var express = require('express');
var users = require(__dirname + '/../models/user');
var uuid = require('node-uuid');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var createQR = require(__dirname + '/../lib/qrcode_generate');
var socketServer = require(__dirname + '/../sockets/base')();
var queue = require(__dirname + '/../models/queue');
var mongoose = require('mongoose');
var Lyric = require(__dirname + '/../models/lyric');

var usersRouter = module.exports = exports = express.Router();

usersRouter.get('/user', function(req, res) {
  var user = {
    id: req.headers.id || uuid.v4(),
    nick: decodeURIComponent(req.headers.nick || 'Guest'),
    expiry: req.headers.expiry || null
  };
  users.add(user);
  if (!users.isExpired(user)) {
    return Lyric.find({}, function (err, data) {
      socketServer.acceptUser(user, queue.queue, data || []);
      return res.status(202).json({id: user.id, nick: user.nick});  
    });
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
  for (var i = 0; i < queue.queue.length; i++) {
    if (queue.queue[i].user.id === userID) {
      queue.queue[i].user = users.getUser(userID);
    }
  }
  socketServer.updateQueue(queue.queue);
  res.status(200).json(users.getUser(req.headers.id));
});
