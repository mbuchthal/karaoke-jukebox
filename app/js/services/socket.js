(function() {
  angular.module('kvoxapp').factory('socket', ['$rootScope', function($rootScope) {
    var socket = io.connect();
    return {
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
        this.emit('registerUser', user, callback);
      },
      onDeck: function(callback) {
        this.emit('onDeck', callback);
      },
      disconnect: function(callback) {
        this.close();
      },
    };
  }]);
})();
