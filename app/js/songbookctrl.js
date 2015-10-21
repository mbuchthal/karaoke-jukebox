require('../app.js');

(function () {
'use strict'

angular.module('kvoxapp').controller('KvoxService', ['$rootScope', function (KvoxService) {


  var vm = this;

  var songs = [];

  function initialize () {
    getSongs();
  }

  function getSongs () {
    // KvoxService.get().then(function (resp) {
    //   vm.songs = resp.data;
    // })
  }

  // function enterSong () {

  // }

}]);

})();


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
