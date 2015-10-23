require('../app.js');

(function () {
  'use strict'

  angular.module('kvoxapp').controller('AdminCtrl', ['socket', '$location', '$base64', '$log', '$http', function (socket, $location, $base64, $log, $http) {

    var vm = this;

    function adminLogin () {
      $http.post('/api/signinAdmin', {
        'Authorization': 'Basic' + $base64.encode(vm.username + ':' + vm.password)
      })
      .success(function () {
        $location.url('/kvox/decodeQR');
      })
      .error(errorHandler);
    }

    function errorHandler (response) {
      $log.error('response', response);
    }

  }]);
})();
