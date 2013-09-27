'use strict';

angular.module('myApp', ['demo', 'snap', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/index', {
        templateUrl: 'partials/index.html'
      })
      .when('/ex-basic', {
        templateUrl: 'partials/ex-basic.html'
      })
      .when('/ex-two-drawers', {
        templateUrl: 'partials/ex-two-drawers.html'
      })
      .when('/ex-remote', {
        templateUrl: 'partials/ex-remote.html',
        controller: 'ExRemoteCtrl'
      })
      .otherwise({redirectTo: '/index'});
  }]);
