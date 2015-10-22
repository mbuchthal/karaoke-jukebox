require('../app.js');

(function () {
  'use strict';

  angular.module('kvoxapp').controller('KvoxCtrl', ['socket', '$location', '$http', function (socket, $location, $http) {

    var vm = this;

    disconnectUser();

    vm.signIn =  function() {

      $http.get('/api/user')
        .success(function (data) {

          var El = document.getElementById('qr-wrapper');
          var qr = document.createElement('div');
          qr.innerHTML = data.QR;
          El.appendChild(qr);
          socket.emit('registerUser', {id: data.id});

        })
      .error(errorHandler);
    };

    socket.on('acceptUser', function() {
      $location.path('/kvox/menu');
    });

    function setName () {
      //using ng model to set user.nick to input value
      $http.patch('/api/user', {nick: vm.user.nick})
      .success(function (resp) {
        console.dir('response', response);
      })
      .error(errorHandler);
    }

    socket.on('disconnectUser', function() {
      $location.url('/knox');
    });

    var sweetAlert = require('./sweetalert');
    socket.on('onDeck', function () {
      sweetAlert();
    });

  }]);
})();
