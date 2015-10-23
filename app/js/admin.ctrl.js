require('../app.js');

(function () {
  'use strict'

  angular.module('kvoxapp').controller('AdminCtrl', ['socket', '$location', '$base64', '$log', '$http', '$cookies', function (socket, $location, $base64, $log, $http, $cookies) {

    var vm = this;
    vm.admin = {basic: {}};
    if ($cookies.get('token')) {
      $http.defaults.headers.common.token = $cookies.get('token');
      if ($location.url() === '/kvox/decodeQR') {
        var tokenDiv = document.createElement('div');
        tokenDiv.id = 'tokenDiv';
        tokenDiv.setAttribute('display', 'none');
        tokenDiv.innerHTML = $cookies.get('token');
        document.getElementById('result').appendChild(tokenDiv);
      }
    }

    vm.adminLogin = function() {
      $http({ 
        url: '/api/signinAdmin', 
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + $base64.encode(vm.admin.username + ':' + vm.admin.basic.password)
      }})
      .success(function (data) {
        $cookies.put('token', data.token);
        $http.defaults.headers.common.token = data.token;
        $location.url('/kvox/decodeQR');
      })
      .error(errorHandler);
    }

    function errorHandler (response) {
      $log.error('response', response);
    }

  }]);
})();
