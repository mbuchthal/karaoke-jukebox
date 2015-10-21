var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var user = require(__dirname + '/../models/user');

var adminRouter = module.exports = exports = express.Router();

adminRouter.post('/signinAdmin', jsonParser, function(req, res) {
  // TODO: Authenticate admin user
});

adminRouter.post('/acceptUser', jsonParser, function(req, res) {
  if (!user.exists(req.headers.id)) {
    return handleError.notFoundError('User not found: ' + req.headers.id, res);
  }
  user.setExpiry(req.headers.id);
  user.usersDict.accepted = true;
  res.status(202).json({msg: 'User has been accepted'});
});

adminRouter.post('/declineUser', jsonParser, function(req, res) {
  if (!user.exists(req.headers.id)) {
    return handleError.notFoundError('User not found: ' + req.headers.id, res);
  }
  user.remove(req.headers.id);
  // TODO: DISCONNECT USER FROM SOCKET
  res.status(200).json({msg: 'User has been declined'});
});

adminRouter.patch('/renameUser', jsonParser, function(req, res) {
  if (!user.exists(req.headers.id)) {
    return handleError.notFoundError('User not found: ' + req.headers.id, res);
  }
  user.changeNick(req.headers.id, req.body.nick);
  res.status(200).json({msg: 'User renamed to: ' + user.getUser(req.headers.id).nick});
});

