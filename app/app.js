require('angular');
require('angular-route');

(function () {
  'use strict'

var app = angular.module('kvoxapp', ['ngRoute']);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/kvox', {
      templateUrl: 'templates/signin.html',
      controller: 'KvoxCtrl as vm',
    })
    .when('/kvox/signin', {
      templateUrl: 'templates/signin-form.html',
      controller: 'KvoxFormCtrl as vm',
    })
    .when('/kvox/songbook', {
      templateUrl: 'partials/templates/songbook.html',
      controller: 'KvoxSongCtrl as vm',
    })
    .when('/kvox/queue', {
      templateUrl: 'partials/templates/queue.html',
      controller: 'KvoxQueueCtrl as vm',
    })
    .otherwise({
      redirectTo: '/kvox'
    });

  }]);

}());
