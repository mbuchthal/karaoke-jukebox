'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGO_URL ||
                'mongodb://localhost/karaoke_jukebox_dev');
process.env.APP_SECRET = process.env.APP_SECRET || 'EVERYBODYDANCENOW';

var io = require('socket.io').listen(server);
var socketServer = require(__dirname + '/sockets/base')(io);

var kjLog = require(__dirname + '/lib/logger');

var lyricsRouter = require(__dirname + '/routes/lyric_routes');
var usersRouter = require(__dirname + '/routes/users_routes');
var queueRouter = require(__dirname + '/routes/queue_routes');
var adminRouter = require(__dirname + '/routes/admin_routes');

app.use(function(req, resp, next) {
  resp.header('Access-Control-Allow-Origin', '*');
  resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  resp.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  next();
});

app.use('/api', lyricsRouter);
app.use('/api', usersRouter);
app.use('/api', queueRouter);
app.use('/api', adminRouter);
app.use(express.static('build'));

var port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', function() {
  kjLog('karaoke-jukebox server listening on ' + port + ' at ' +
      new Date().toString());
});

module.exports = exports = server;

server.shutDown = function() {
  mongoose.disconnect();
  server.close();
};
