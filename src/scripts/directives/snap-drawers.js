angular.module('snap')
  .directive('snapDrawers', function () {
    'use strict';
    return {
      transclude: true,
      replace: true,
      template: '<div class="snap-drawers" ng-transclude></div>'
    };
  });
