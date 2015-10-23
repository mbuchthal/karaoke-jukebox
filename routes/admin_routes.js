var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var user = require(__dirname + '/../models/user');
var queue = require(__dirname + '/../models/queue');
var Admin = require(__dirname + '/../models/admin');
var eatAuth = require(__dirname + '/../lib/eat_authentication');
var httpBasic = require(__dirname + '/../lib/http_basic');
var socketServer = require(__dirname + '/../sockets/base')();
var Lyric = require(__dirname + '/../models/lyric');
var mongoose = require('mongoose');
var createQR = require(__dirname + '/../lib/qrcode_generate');

var adminRouter = module.exports = exports = express.Router();

if (process.env.APP_SECRET === 'EVERYBODYDANCENOW') {
  var devAdmin = new Admin();
  devAdmin.basic.username = 'admin';
  devAdmin.username = 'admin';
  devAdmin.generateHash('foobar123', function(err, hash) {
    devAdmin.save(function(err, data) {
    });
  });
}

adminRouter.post('/signupAdmin', jsonParser, function(req, res) {
  var newAdmin = new Admin();
  newAdmin.basic.username = req.body.username;
  newAdmin.username = req.body.username;
  newAdmin.generateHash(req.body.password, function(err, hash) {
    if (err) {return handleError.internalServerError(err, res);}
    newAdmin.save(function(err, data) {
      if (err) {return handleError.internalServerError(err, res);}
      newAdmin.generateToken(function(err, token) {
        res.json({token: token});
      });
    });
  });
});

adminRouter.get('/signinAdmin', httpBasic, function(req, res) {
  console.log(req.auth)
  Admin.findOne({'basic.username': req.auth.username}, function(err, admin) {
    if (err) {return handleError.internalServerError(err, res);}
    if (!admin) {return handleError.unauthorized(err, res);}
    admin.compareHash(req.auth.password, function(err, hashRes) {
      if (err) {return handleError.internalServerError(err, res);}
      if (!hashRes) {return handleError.unauthorized(err, res);}
      admin.generateToken(function(err, token) {
        if (err) {return handleError.internalServerError(err, res);}
        console.log(token);
        res.json({token: token});
      });
    });
  });
});

adminRouter.post('/acceptUser', jsonParser, eatAuth, function(req, res) {
  console.log(user.usersDict);
  console.log('acceptuser id: ' + req.body.id);
  var userID = req.body.id;
  if (!user.exists(userID)) {
    return handleError.notFoundError('User not found: ' + userID, res);
  }
  Lyric.find({}, function(err, data) {
    if (err) { return handleError.internalServerError(err, data); }
    user.setExpiry(user.getUser(userID));
    socketServer.acceptUser(user.getUser(userID), queue.queue, data || []);
    res.status(202).json({msg: 'User has been accepted'});
  });
});

adminRouter.post('/declineUser', jsonParser, eatAuth, function(req, res) {
  var userID = req.body.id;
  if (!user.exists(userID) || user.isExpired(user.getUser(userID))) {
    return handleError.notFoundError('User not found: ' + req.body.id, res);
  }
  socketServer.disconnectUser(user.getUser(req.body.id));
  user.remove(req.body.id);
  res.status(200).json({msg: 'User has been declined'});
});

adminRouter.patch('/renameUser', jsonParser, eatAuth, function(req, res) {
  var userID = req.body.id;
  if (!user.exists(userID) || user.isExpired(user.getUser(userID))) {
    return handleError.notFoundError('User not found: ' + req.body.id, res);
  }
  user.changeNick(req.body.id, req.body.nick);
  res.status(200).json({msg: 'User renamed to: ' + user.getUser(req.body.id).nick});
});

adminRouter.post('/staticQR', jsonParser, eatAuth, function(req, res) {
  var qrString = createQR(req.body.qrMsg, 'svg');
  res.status(200).json({msg: 'QR Generated', QR: qrString});
});

adminRouter.delete('/nextSong', eatAuth, function(req, res) {
  queue.nextSong();
  res.status(200).json({});
});
