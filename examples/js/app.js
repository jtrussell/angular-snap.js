'use strict';

angular.module('myApp', ['snap', 'myApp.controllers']).
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
      .otherwise({redirectTo: '/index'});
  }]);
