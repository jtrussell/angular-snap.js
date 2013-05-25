/*global angular */

angular.module('snap')
  .directive('snapShelves', function () {
    'use strict';
    return {
      transclude: true,
      replace: true,
      template: '<div class="ngSnap ngSnap-shelves" ng-transclude></div>'
    };
  });
