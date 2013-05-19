'use strict';

angular.module('demo', ['snap'])
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      '...',
      'and Snap.js!'
    ];
  });
