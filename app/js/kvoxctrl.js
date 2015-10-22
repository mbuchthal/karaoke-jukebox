require('../app.js');

(function () {
  'use strict'

  angular.module('kvoxapp').controller('KvoxCtrl', ['socket', '$location', function (socket, $location) {

    var vm = socket;

    disconnectUser();


    function signIn () {
      socket.on('acceptUser'), function() {
        $location.url('/kvox/menu');
      }
    }

    function setName () {
      //set vm.user.nick to new value
      socket.on('updateUser'), function () {
        $location.url('/kvox/menu');
      }
    }

    function disconnectUser (user) {
      socket.on('disconnectUser', function () {
        $location.url('/kvox');
      });
    }

  }]);

})();

//login controller
//
// socket.on('acceptUser')
//
