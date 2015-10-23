(function() {
  angular.module('kvoxapp').factory('socket', ['$rootScope', '$http', function($rootScope, $http) {
    var socket = io.connect();

    socket.on('updateQueue', function(queue) {
      $rootScope.$apply(function() {
        socketObj.queue = queue;
      });

      console.log(queue);
    });

    socket.on('acceptUser', function(data) {
      $rootScope.$apply(function() {
        socketObj.user = data.user;
        socketObj.queue = data.queue;
        socketObj.songlist = data.songlist;
        $http.defaults.headers.common.id = data.user.id;
        $http.defaults.headers.common.nick = data.user.nick;
        $http.defaults.headers.common.expiry = data.user.expiry;
      });
    });

    socket.on('updateUser', function(data) {
      $rootScope.$apply(function() {
        socketObj.user = data.user;
        $http.defaults.headers.common.nick = data.user.nick;
        $http.defaults.headers.common.expiry = data.user.expiry;
      });
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
          $rootScope.$apply(function(){
            if (callback) {
              callback.apply(socket, args);
            }
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



  return socketObj;
  }]);
})();
