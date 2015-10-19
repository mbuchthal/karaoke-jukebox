'use strict';

var express = require('express');
var jsonParser = require('body-parser').json();
var Lyric = require(__dirname + '/../models/lyric');

var kjLog = require(__dirname + '/../lib/logger');
var lyricsRouter = module.exports = exports = express.Router();

lyricsRouter.get('/lyrics/:mp3file', jsonParser, function(req, resp) {
  Lyric.find(req.params, function(err, data) {
    if (err) {
      kjLog(err);
      return resp.status(500).json({msg: 'internal server error'});
    }
    if ((!data) || (0 === data.length)) {
      return resp.status(404).json({msg: 'lyric not found'});
    } // jscs ignore:start because there's no reason to indent the else
    else {
      resp.json(data);
    } // jscs ignore:end
  });
});

lyricsRouter.get('/lyrics', function(req, resp) {
  Lyric.find({}, function(err, data) {
    if (err) {
      kjLog(err);
      return resp.status(500).json({msg: 'internal server error'});
    }
    resp.json(data);
  });
});

lyricsRouter.post('/lyrics', jsonParser, function(req, resp) {
  var newLyric = new Lyric(req.body);
  newLyric.save(function(err, data) {
    if (err) {
      if ('ValidationError' === err.name) {
        return resp.status(400).json({msg: err.errors.title.message});
      } else {
        return resp.status(403).json({msg: err.toString()});
      }
    }
    resp.status(201).json(data);
  });
});
