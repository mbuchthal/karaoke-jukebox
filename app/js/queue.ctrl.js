require('../app.js');

(function () {
'use strict'

  angular.module('kvoxapp').controller('KvoxQueueCtrl', ['socket', '$location', '$http', function (socket, $location, $http) {

    var vm = this;

    vm.user = socket.user;
    vm.song = socket.song;

    function chickenOut () {
      $http({
        method: 'delete',
        url: '/api/queue',
        headers: {'vm.user': 'vm.user.id'}
      })
      .success(function (resp) {
        $location.url('/menu');
      })
      .error (errorHandler);
    }

    function errorHandler (reponse) {
      $log.error('response', response);
    }

  }]);

})();
