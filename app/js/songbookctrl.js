require('../app.js');

(function () {
'use strict'

angular.module('kvoxapp').controller('KvoxService', function (KvoxService) {


  var vm = this;

  var songs = [];

  function initialize () {
    getSongs();
  }

  function getSongs () {
    KvoxService.get().then(function (resp) {
      vm.songs = resp.data;
    })
  }



})

})();
