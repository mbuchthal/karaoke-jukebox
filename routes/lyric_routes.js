'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var Lyric = require(__dirname + '/../models/lyric');
var eatAuth = require(__dirname + '/../lib/eat_authentication');

var handleError = require(__dirname + '/../lib/handle_error');
var lyricsRouter = module.exports = exports = express.Router();

lyricsRouter.get('/lyrics/:mp3file', jsonParser, function(req, resp) {
  Lyric.findOne(req.params, function(err, data) {
    if (err) {
      return handleError.internalServerError(err, resp) ;
    }
    if ((!data) || (0 === data.length)) {
      return handleError.notFoundError(err, resp);
    }
    else {
      return resp.status(200).json(data);
    }
  });
});

lyricsRouter.get('/lyrics', function(req, resp) {
  Lyric.find({}, function(err, data) {
    if (err) {
      return handleError.internalServerError(err, resp) ;
    }
    return resp.status(200).json(data);
  });
});

lyricsRouter.post('/lyrics', jsonParser, eatAuth, function(req, resp) {
  var newLyric = new Lyric(req.body);
  newLyric.save(function(err, data) {
    if (err) {
      if ('ValidationError' === err.name) {
        return handleError.badRequest(err.errors.title, resp);
      } else {
        return handleError.internalServerError(err.toString(), resp);
      }
    }
    return resp.status(201).json(data);
  });
});

lyricsRouter.put('/lyrics/:mp3file', jsonParser, eatAuth, function(req, resp) {
  Lyric.findOneAndUpdate(req.params, req.body, function(err, data) {
    if (err) {
      return handleError.internalServerError(err, resp);
    }
    if ((!data) || (0 === data.length)) {
      return handleError.notFoundError(err, resp);
    }
    else {
      resp.status(200).json(data);
    }
  });
});

lyricsRouter.delete('/lyrics/:mp3file', eatAuth, function(req, resp) {
  Lyric.remove(req.params, function(err, data) {
    if (err) {
      return handleError.internalServerError(err, resp);
    }
    resp.status(200).json(data);
  });
});
