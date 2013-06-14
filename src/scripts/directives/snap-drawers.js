angular.module('snap')
  .directive('snapDrawers', function () {
    'use strict';
    return {
      transclude: true,
      replace: true,
      restrict: 'AE',
      template: '<div class="snap-drawers" ng-transclude></div>'
    };
  });
