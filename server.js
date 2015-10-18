'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL ||
    'mongodb://localhost/karaokeJukebox_dev');

var io = require('socket.io').listen(server);
var SocketServer = require('./sockets/base');
var socketServer = new SocketServer(io);

var kjLog = require(__dirname + '/lib/logger');

var port = process.env.PORT || 3000;
server.listen(port, function() {
  kjLog('karaoke-jukebox server listening on ' + port + ' at ' +
      new Date().toString());
});
