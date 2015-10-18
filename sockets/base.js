var EventEmitter = require('events');

module.exports = function(io) {
  var connections = {};
  var clients = {};
  var clientSockets = {};

  var serverEvents = new EventEmitter();

  io.on('connection', function(socket) {
    socket.on('ping', function() {
      io.sockets.emit('pong');
    });
    socket.on('registerUser', function(data) {
      connections[data.token] = {
        socketID: socket.id
      };
      serverEvents.emit('registerUser', data.token);
    });
    socket.on('onDeck', function(data) {
      clearTimeout(clientSockets[socket.id].timeout);
      clientSockets[socket.id].callback();
    });
    socket.on('disconnect', function() {
      var user = clientSockets[socket.id];
      clientSockets[socket.id] = null;
      clients[user.id] = null;
      serverEvents.emit('disconnected', user);
    });
  });

  this.getEmitter = function() {
    return serverEvents;
  };

  this.updateQueue = function(data) {
    io.to('karaoke').emit('updateQueue', data);
  };

  this.acceptUser = function(token, user, queue, songList) {
    var socketID = connections[token].socketID;
    clients[user.id] = user;
    clientSockets[socketID] = user;
    connections[token] = null;
    io.sockets.socket(socketID).join('karaoke');
    io.sockets.socket(socketID).emit('acceptUser', {
      user: user,
      token: token,
      queue: queue,
      songlist: songList
    });
  };

  this.declineConnection = function(token) {
    io.sockets.socket(connections[token]).emit('declineUser');
    io.sockets.socket(connections[token]).close();
  };

  this.onDeck = function(user, callback) {
    clients[user.id].callback = callback;
    clients[user.id].timeout = setTimeout(function() {
      callback(true);
    }, 30000);
    io.sockets.socket(clients[user.id]).emit('onDeck');
  };

};
