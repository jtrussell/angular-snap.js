
angular.module('myApp', ['demo', 'snap', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    'use strict';
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
      .when('/ex-options', {
        templateUrl: 'partials/ex-options.html',
        controller: 'ExOptionsCtrl'
      })
      .otherwise({redirectTo: '/index'});
  }]);
