
angular.module('myApp', ['ngRoute', 'demo', 'snap', 'myApp.controllers']).
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
      .when('/ex-dragger', {
        templateUrl: 'partials/ex-dragger.html'
      })
      .when('/ex-remote', {
        templateUrl: 'partials/ex-remote.html',
        controller: 'ExRemoteCtrl'
      })
      .when('/ex-options', {
        templateUrl: 'partials/ex-options.html',
        controller: 'ExOptionsCtrl'
      })
      .when('/ex-two-snappers', {
        templateUrl: 'partials/ex-two-snappers.html'
      })
      .otherwise({redirectTo: '/index'});
  }]);
