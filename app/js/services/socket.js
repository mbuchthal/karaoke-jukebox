(function() {
  angular.module('kvoxapp').factory('socket', ['$rootScope', '$http', function($rootScope, $http) {
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

    socket.on('disconnectUser', function() {
      $http.defaults.headers.common.id = null;
      $http.defaults.headers.common.nick = null;
      $http.defaults.headers.common.expiry = null;
      socketObj.user = {};
      socketObj.queue = null;
      socketObj.songlist = null;
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
        $http.defaults.headers.common.id = null;
        $http.defaults.headers.common.nick = null;
        $http.defaults.headers.common.expiry = null;
        socket.close();
      },
      user: {},
      queue: null,
      songlist: null
    };

    $http.defaults.headers.common.id = socketObj.user.id;
    $http.defaults.headers.common.nick = socketObj.user.nick;
    $http.defaults.headers.common.expiry = socketObj.user.expiry;

  return socketObj;
  }]);
})();
