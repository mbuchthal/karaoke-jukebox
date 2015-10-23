require('../app.js');

(function () {
  'use strict';


  angular.module('kvoxapp').controller('KvoxCtrl', ['socket', '$location', '$http', '$scope', '$log', function (socket, $location, $http, $scope, $log) {

    var vm = this;

    disconnectUser();

    vm.signIn =  function() {

      $http.get('/api/user')
        .success(function (data) {
          var parentEl = document.getElementById('sign-in_header');
          var El = document.getElementById('qr-wrapper');
          var qr = document.createElement('div');
          qr.className = "qr-item";
          qr.innerHTML = data.QR;
          El.appendChild(qr);
          // parentEl.hide();
          // qr.scrollIntoView();
          socket.emit('registerUser', {id: data.id});

        })
      .error(errorHandler);
    }

    socket.on('acceptUser', function() {
        $location.url('/kvox/menu');
    });


    function setName () {
      //using ng model to set user.nick to input value
      $http.patch('/api/user', {nick: vm.user.nick})
      .success(function (resp) {
        console.dir('response', response);
      })
      .error(errorHandler);
    }

    function disconnectUser () {
      socket.on('disconnectUser', function() {
        $location.url('/knox');
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
