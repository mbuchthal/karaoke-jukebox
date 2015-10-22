require('../app.js');
require('./llqrcode.js');
require('./decodeQR.js');

(function () {
  'use strict'

  angular.module('kvoxapp').controller('AdminCtrl', ['socket', '$location', '$base64', function (socket, $location, $base64) {

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
