require('../app.js');

(function () {
  'use strict';


  angular.module('kvoxapp').controller('KvoxCtrl', ['socket', '$location', '$http', '$scope', '$log', '$cookies', function (socket, $location, $http, $scope, $log, $cookies) {

    var vm = this;

    disconnectUser();

    vm.signIn =  function() {

      if ($cookies.get('id')) {
        socket.emit('registerUser', {id: $cookies.get('id')});
        setTimeout(function() {
        $http({
          method: 'GET',
          url: '/api/user',
          headers: {
            'id': $cookies.get('id'),
            'nick': $cookies.get('nick'),
            'expiry': $cookies.get('expiry')
          }}).success( function(data) {
            if (data.QR) {
              var El = document.getElementById('qr-wrapper');
              var qr = document.createElement('div');
              qr.innerHTML = data.QR;
              El.appendChild(qr);
            }
            
          });
          }, 250);
        } else { 

         $http.get('/api/user')
        .success(function (data) {
          var El = document.getElementById('qr-wrapper');
          var qr = document.createElement('div');
          qr.innerHTML = data.QR;
          El.appendChild(qr);
          socket.emit('registerUser', {id: data.id});

        })
        .error(errorHandler);
      }
    }

    socket.on('acceptUser', function() {
        $location.url('/kvox/menu');
    });


    vm.setName = function() {
      //using ng model to set user.nick to input value
      $http.patch('/api/user', {nick: vm.user.nick})
      .success(function (res) {
        console.dir('response: ' + res);
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
