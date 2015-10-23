var express = require('express');
var queue = require(__dirname + '/../models/queue');
var users = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var socketServer = require(__dirname + '/../sockets/base')();
var handleError = require(__dirname + '/../lib/handle_error');
var EventEmitter = require('events');
var queueRouter = module.exports = exports = express.Router();
var Lyric = require(__dirname + '/../models/lyric');

queueRouter.post('/queue', jsonParser, function(req, res) {
  var userID = req.headers.id;
  if (!users.exists(userID) || users.isExpired(users.getUser(userID))) {
    return handleError.unauthorized(null, res);
  }
  var query = {};
  if (req.body.song && req.body.song.mp3file) {
    query.mp3file = req.body.song.mp3file;
  }
  Lyric.findOne(query, function(err, song) {
    if (err) {
      return handleError.internalServerError(null, res);
    }
    queue.add(song, users.getUser(req.headers.id));
    users.getUser(req.headers.id).queued = true;
    if (req.body.song) {
      users.getUser(userID).queuedSong = song;
    }
    socketServer.updateUser(users.getUser(userID));
    socketServer.updateQueue(queue.queue);
    res.status(200).json({});
  });
});

queueRouter.patch('/queue', jsonParser, function(req, res) {
  var userID = req.headers.id;
  if (!users.exists(userID) || users.isExpired(users.getUser(userID))) {
    return handleError.unauthorized(null, res);
  }
  if (!queue.hasSong(users.getUser(req.headers.id))) {
    return handleError.notFoundError(null, res);
  }
  if (req.body && req.body.song) {
    return Lyric.findOne({mp3file: req.body.song.mp3file}, function(err, song) {
      if (err) {
        return handleError.internalServerError(null, res);
      }
      if (!song) {
        return handleError.notFoundError(null, res);
      }
      users.getUser(userID).queuedSong = song;
      socketServer.updateUser(users.getUser(userID));
      queue.changeSong(users.getUser(req.headers.id), song);
      socketServer.updateQueue(queue.queue);
      return res.status(200).json({});
    });
  } else {
    var result = queue.reOrder(users.getUser(req.headers.id));
    if (!result) {
      return handleError.badRequest(null, res);
    }
  }
  socketServer.updateQueue(queue.queue);
  return res.status(200).json({});
});

queueRouter.delete('/queue', function(req, res) {
  var userID = req.headers.id;
  if (!users.exists(userID) || users.isExpired(users.getUser(userID))) {
    return handleError.unauthorized(null, res);
  }
  if (!queue.hasSong(users.getUser(req.headers.id))) {
    return handleError.notFoundError(null, res);
  }
  users.getUser(userID).queued = null;
  users.getUser(userID).queuedSong = null;
  queue.removeSong(users.getUser(req.headers.id));
  socketServer.updateQueue(queue.queue);
  return res.status(200).json({});
});
