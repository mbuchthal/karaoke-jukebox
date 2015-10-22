require('../app.js');

(function () {
'use strict'

  angular.module('kvoxapp').controller('SongBookCtrl', ['socket', '$location', function (socket, $location) {

    var vm = this;
    // vm.user = socket.user;
    // // vm.songs = socket.songList;
    vm.songs = [];
    var songSampleOne = {
      title:  'Cherry Pie',
      author: 'Poison'
    };
    var songSampleTwo = {
      title: 'American Pie',
      author: 'Don Mclean'
    };
    vm.songs.push(songSampleTwo);
    vm.songs.push(songSampleOne);
    console.log(vm.songs);
    console.log(vm.songs[0].author);

    disconnectUser();


    function enterSong () {
      if (!vm.song) {
        // enter song into queue
        $http.post('/api/queue', vm.song, {
          headers: {'vm.user': 'vm.user.id'}
        })
        .success(function (resp) {
          $location.url('/queue');
        })
        .error(errorHandler);
      } else {
        // update song in queue
        $http.patch('/api/queue', vm.song, {
          headers: {'vm.user': 'vm.user.id'}
        })
        .success(function (resp) {
          $location.url('/queue');
        })
      }
    }

    function disconnectUser (user) {
      socket.on('disconnectUser', function () {
        $location.url('/kvox');
      });
    }

    function errorHandler (response) {
      $log.error('response', response);
    }

  }]);

})();




// .controller('insidecontroller', ['socket', function(socket){
//  socket.on('updateQueue', function(data){
//    $rootScope.queue = data.queue;
//  })

// }])
