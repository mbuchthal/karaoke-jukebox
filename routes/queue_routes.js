var express = require('express');
var queue = require(__dirname + '/../models/queue');
var users = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();

var handleError = require(__dirname + '/../lib/handle_error');

var queueRouter = module.exports = exports = express.Router();

queueRouter.post('/queue', jsonParser, function(req, res) {
  if (!(req.headers.id)) {
    return handleError.badRequest(null, res);
  }
  queue.add(req.body.song, users.getUser(req.headers.id));
  res.status(200).json({});
});

queueRouter.patch('/queue', jsonParser, function(req, res) {
  if (!(req.headers.id)) {
    return handleError.badRequest(null, res);
  }
  if (!queue.hasSong(users.getUser(req.headers.id))) {
    return handleError.badRequest(null, res);
  }
  if (req.body && req.body.song) {
    queue.changeSong(users.getUser(req.headers.id), req.body.song);
  } else {
    var result = queue.reOrder(users.getUser(req.headers.id));
    if (!result) {
      return handleEror.badRequest(null, res);
    }
  }
  return res.status(200).json({});
});

queueRouter.delete('/queue', function(req, res) {
  if (!(req.headers.id)) {
    return handleError.badRequest(null, res);
  }
  if (!queue.hasSong(users.getUser(req.headers.id))) {
    return handleError.badRequest(null, res);
  }
  queue.removeSong(users.getUser(req.headers.id));
  return res.status(200).json({});
});
