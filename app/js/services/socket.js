module.exports = function(app) {
  app.factory('socket', ['$rootScope', function($rootScope) {
    var socket = io.connect();

    socket.on('updateQueue', function(queue) {
      socketObj.queue = queue;
    });

    socket.on('acceptUser', function(user, queue, songlist) {
      socketObj.user = user;
      socketObj.queue = queue;
      socketObj.songlist = songlist;
    });

    socket.on('updateUser', function(user) {
      socketObj.user = user;
    });

    var socketObj = {
      on: function(event, callback) {
        socket.on(event, function() {
          var args = arguments;
          $rootScope.apply(function() {
            callback.apply(socket, args);
          });
        });
      },
      emit: function(event, data, callback) {
        socket.emit(event, data, function() {
          var args = arguments;
          $rootScope.apply(function() {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      },
      registerUser: function(user, callback) {
        socket.emit('registerUser', user, callback);
      },
      onDeck: function(callback) {
        socket.emit('onDeck', callback);
      },
      disconnect: function(callback) {
        socket.close();
      },
      user: null,
      queue: null,
      songlist: null
    };

  return socketObj;
  }]);
};
