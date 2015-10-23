require('../app.js');

(function () {
'use strict'

  angular.module('kvoxapp').controller('KvoxQueueCtrl', ['socket', '$location', '$http', '$scope', '$log', function (socket, $location, $http, $scope, $log) {


    var vm = this;
    vm.user = socket.user;
    vm.queue = socket.queue;
    socket.on('updateQueue', function(){
      vm.queue = socket.queue;
    });


    vm.queueUp = function() {
      if (socket.queued) { return false; }
      socket.queued = true;
      $http.post('/api/queue')
      .success(function(res) {
        vm.queue.push({user:{nick:vm.user.nick}});
      })
      .error(function(res) {
        console.log('failed to add to queue: ' + res);
      })
    }

    var sweetAlert = require('./sweetalert');
    disconnectUser();

    socket.on('onDeck', function () {
      sweetAlert();
    });

    function chickenOut () {

      socket.queued = false;
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
