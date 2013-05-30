/*global angular */

'use strict';

angular.module('demo', ['snap'])
  .controller('MainCtrl', function ($scope) {
    $scope.snapOpts = {
      disable: 'right'
    };
  });
