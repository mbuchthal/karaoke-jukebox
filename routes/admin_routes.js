var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var user = require(__dirname + '/../models/user');
var queue = require(__dirname + '/../models/queue');
var socketServer = require(__dirname + '/../sockets/base')();

var createQR = require(__dirname + '/../lib/qrcode_generate');

var adminRouter = module.exports = exports = express.Router();

adminRouter.post('/signinAdmin', jsonParser, function(req, res) {
  // TODO: Authenticate admin user
});

adminRouter.post('/acceptUser', jsonParser, function(req, res) {
  if (!user.exists(req.body.id)) {
    return handleError.notFoundError('User not found: ' + req.body.id, res);
  }
  user.setExpiry(req.body.id);
  user.usersDict.accepted = true;
  res.status(202).json({msg: 'User has been accepted'});
});

adminRouter.post('/declineUser', jsonParser, function(req, res) {
  if (!user.exists(req.body.id)) {
    return handleError.notFoundError('User not found: ' + req.body.id, res);
  }
  socketServer.disconnectUser(user.getUser(req.body.id));
  user.remove(req.body.id);
  res.status(200).json({msg: 'User has been declined'});
});

adminRouter.patch('/renameUser', jsonParser, function(req, res) {
  if (!user.exists(req.body.id)) {
    return handleError.notFoundError('User not found: ' + req.body.id, res);
  }
  user.changeNick(req.body.id, req.body.nick);
  res.status(200).json({msg: 'User renamed to: ' + user.getUser(req.body.id).nick});
});

adminRouter.post('/staticQR', jsonParser, function(req, res) {
  var qrString = createQR(req.body.qrMsg, 'svg');
  res.status(200).json({msg: 'QR Generated', QR: qrString});
});

adminRouter.delete('/nextSong', function(req, res) {
  queue.nextSong();
  res.status(200).json({});
});
