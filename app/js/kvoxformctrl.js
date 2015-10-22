require('../app.js');

(function () {
'use strict'


  angular.module("kvoxapp").controller("KvoxFormCtrl", ["socket", function (socket) {

    disconnectUser();

    function disconnectUser (user) {
      socket.on('disconnectUser', function () {
        $location.url('/kvox');
      });
    }

  }]);

})();
