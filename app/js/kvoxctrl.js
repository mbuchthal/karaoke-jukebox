require('../app.js');

(function () {
  'use strict'

  angular.module('kvoxapp').controller('KvoxCtrl', ['socket', '$location', '$scope', function (socket, $location, $scope) {

    var vm = socket;

    disconnectUser();

    function signIn () {

      $http.get('/api/user')
      .success(function (data) {

        var El = document.getElementById('qr-wrapper');
        var newQr = data.QR;
        El.appendChild(newQr);

      })
      .error(errorHandler);
    }

    socket.on('acceptUser'), function() {
        $location.url('/kvox/menu');
        $scope.apply()
    }

    function setName () {
      //using ng model to set user.nick to input value
      $http.patch('/api/user', {nick: vm.user.nick})
      .success(function (resp) {
        console.dir('response', response);
      })
      .error(errorHandler);
    }

    function disconnectUser (user) {
      socket.on('disconnectUser', function () {
        $location.url('/kvox');
      });
    }
    var sweetAlert = require('./sweetalert');
    socket.on('onDeck', function () {
      sweetAlert();
    });

    function errorHandler (response) {
      $log.error('response', response);
    }

  }]);
})();
