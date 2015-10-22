require('../app.js');

(function () {
'use strict'

  angular.module('kvoxapp').controller('KvoxQueueCtrl', ['socket', '$location', '$http', function (socket, $location, $http) {

    var vm = this;
    vm.user = socket.user;
    vm.song = socket.song;

    disconnectUser();

//does this need a vm.user?
    socket.on('onDeck', function () {
      showOnDeck();
    });

    function showOnDeck() {
      //do something to alert user and prompt them
      //possibly confirm('You are on deck to sing.  Press ok to confirm')

      var confirm = confirm('You are next to sing.  Press ok to confirm.');
      if (confirm == true) {
        alert('Get ready to sing!');
        $location.url('/menu');
      } else {
        alert('You have been moved down the queue')
        $location.url('/queue');
      }
    }

    function chickenOut () {
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

    function errorHandler (reponse) {
      $log.error('response', response);
    }

  }]);

})();


//function clickedShowButton
// .controller('logincontroller', ['socket', function(socket){
//  socket.on('acceptUser', function(data){
//    $rootScope.songlist = data.songlist;
//    $rootScope.nick = data.nick
//    $rootScope.queue = data.queue;
//  })

// }])
