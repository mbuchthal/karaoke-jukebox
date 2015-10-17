'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL ||
    'mongodb://localhost/karaokeJukebox_dev');

var kjLog = require(__dirname + '/lib/logger');

var port = process.env.PORT || 3000;
app.listen(port, function() {
  kjLog('karaoke-jukebox server listening on ' + port + ' at ' +
      new Date().toString());
});
