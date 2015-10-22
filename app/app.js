require('angular');
require('angular-route');
require('angular-sweetalert');
require('sweetalert');

(function () {
  'use strict'

var app = angular.module('kvoxapp', ['ngRoute']);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/kvox', {
      templateUrl: 'templates/signin.html',
      controller: 'KvoxCtrl as vm'
    })
    // .when('/kvox/signin', {
    //   templateUrl: 'templates/signin-form.html',
    //   controller: 'KvoxFormCtrl as vm'
    // })
    .when('/kvox/qr', {
      templateUrl: 'templates/qr.html',
      controller: 'KvoxCtrl as vm'
    })
    .when('/kvox/songbook', {
      templateUrl: 'templates/songbook.html',
      controller: 'SongBookCtrl as vm',
    })
    .when('/kvox/queue', {
      templateUrl: 'templates/queue.html',
      controller: 'KvoxQueueCtrl as vm',
    })
    .when('/kvox/queue', {
      templateUrl: 'templates/queue.html',
      controller: 'KvoxQueueCtrl as vm'
    })
    .when('/kvox/menu', {
      templateUrl: 'templates/menu.html',
      controller: 'KvoxCtrl as vm'
    })
    .when('/kvox/admin', {
      templateUrl: 'templates/signin-form.html',
      controller: 'KvoxCtrl as vm'
    })
    .when('/kvox/renderer', {
      templateUrl: 'templates/renderer.html',
      controller: 'RendererCtrl as vm',
    })
    .when('/kvox/menutwo', {
      templateUrl: 'templates/menutwo.html',
      controller: 'KvoxCtrl as vm'
    })
    .otherwise({
      redirectTo: '/kvox'
    });

  }]);

}());
