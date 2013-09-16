'use strict';

angular.module('myApp', ['snap', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/index', {
        templateUrl: 'partials/index.html'
      })
      .when('/ex-basic', {
        templateUrl: 'partials/ex-basic.html',
        controller: 'ExBasicCtrl'
      })
      .otherwise({redirectTo: '/index'});
  }]);
