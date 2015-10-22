var EventEmitter = require('events');

var instance;

module.exports = exports = function(io, newInstance) {
  //Classic singleton pattern :D
  if (!instance || newInstance) {
    instance = new SocketServer(io);
  }
  return instance;
};

function SocketServer(io) {
  var connections = {};
  var clients = {};
  var clientSockets = {};

  var serverEvents = new EventEmitter();

  io.on('connection', function(socket) {
    socket.on('ping', function() {
      io.sockets.emit('pong');
    });
    socket.on('registerUser', function(user) {
      connections[user.id] = {
        socketID: socket.id
      };
      serverEvents.emit('registerUser', user.id);
      console.log('registeruser id: ' + user.id);
      console.log('socket id: ' + socket.id);
    });
    socket.on('onDeck', function(data) {
      clearTimeout(clientSockets[socket.id].timeout);
      clientSockets[socket.id].callback(true);
    });
    socket.on('disconnect', function() {
      if (clientSockets[socket.id]) {
        var user = clientSockets[socket.id];
        clientSockets[socket.id] = null;
        clients[user.id] = null;
        serverEvents.emit('disconnected', user);
      }
    });
  });

  this.getEmitter = function() {
    return serverEvents;
  };

  this.updateQueue = function(data) {
    io.to('karaoke').emit('updateQueue', data);
  };

  this.acceptUser = function(user, queue, songList) {
    console.log(connections);
    console.log('user id: ' + user.id);
    if (connections[user.id]) {
      var socketID = connections[user.id].socketID;
      clients[user.id] = user;
      clients[user.id].socketID = socketID;
      clientSockets[socketID] = user;
      connections[user.id] = null;
      io.sockets.connected[socketID].join('karaoke');
      io.to(socketID).emit('acceptUser', {
        user: user,
        queue: queue,
        songlist: songList
      });
    }
  };

  this.disconnectUser = function(user) {
    var userSocket;
    if (connections[user.id]) {
      userSocket = connections[user.id];
      connections[user.id] = null;
    }
    if (clients[user.id]) {
      userSocket = clients[user.id];
      var socketID = clients[user.id].socketID;
      clients[user.id] = null;
      clientSockets[socketID] = null;
    }
    io.to(userSocket.socketID).emit('disconnectUser');
    io.sockets.connected[userSocket.socketID].disconnect();
  };

  this.updateUser = function(user) {
    if (clients[user.id]) {
      io.to(clients[user.id].socketID).emit('updateUser', {user: user});
    }
  };

  this.onDeck = function(user, callback) {
    clients[user.id].callback = callback;
    clients[user.id].timeout = setTimeout(function() {
      callback(false);
    }, 60000);
    io.to(clients[user.id].socketID).emit('onDeck');
  };

}
