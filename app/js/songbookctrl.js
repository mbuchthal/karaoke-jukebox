require('../app.js');

(function () {
'use strict'

  angular.module('kvoxapp').controller('SongBookCtrl', ['socket', function ( socket) {

    var vm = this;
    vm.user = socket.user;
    vm.songs = socket.songList;

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

  }]);

})();

//all controllers
//disconnectUser

//login controller
//
// socket.on('acceptUser')
//


//queue
// socket.on('onDeck', function ())
    // showOnDeck();
    // });

// function showOnDeckBox() {
  // does something to show they are next to confirm
//}

// function chickenedOutLikeaPansy () {
//   $http.delet('/api/queue')
// }

//function clickedShowButton
// .controller('logincontroller', ['socket', function(socket){
//  socket.on('acceptUser', function(data){
//    $rootScope.songlist = data.songlist;
//    $rootScope.nick = data.nick
//    $rootScope.queue = data.queue;
//  })

// }])

// .controller('insidecontroller', ['socket', function(socket){
//  socket.on('updateQueue', function(data){
//    $rootScope.queue = data.queue;
//  })

// }])
