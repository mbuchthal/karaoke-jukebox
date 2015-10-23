require('../app.js');

(function () {
'use strict'

  angular.module('kvoxapp').controller('KvoxQueueCtrl', ['socket', '$location', '$http', '$scope', '$log', function (socket, $location, $http, $scope, $log) {


    var vm = this;
    vm.user = socket.user;
    vm.song = socket.song;

    var sweetAlert = require('./sweetalert');
    disconnectUser();

    socket.on('onDeck', function () {
      sweetAlert();
    });

    function chickenOut () {
      console.log('chicken');
      $http.delete( '/api/queue', {
        headers: {'vm.user': 'vm.user.id'}
      })
      .success(function (resp) {
        $location.url('/menu');
      })
      .error(errorHandler);
    }

    function disconnectUser (user) {
      socket.on('disconnectUser', function () {
        $location.url('/kvox');
      });
    }

    function errorHandler (response) {
      $log.error('response', response);
    }

    var sweetAlert = require('./sweetalert');
    socket.on('onDeck', function () {
      sweetAlert();
    });

  }]);

})();
