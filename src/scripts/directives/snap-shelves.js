/*global angular */

angular.module('snap')
  .directive('snapShelves', function () {
    'use strict';
    return {
      restrict: 'A',
      transclude: true,
      template: [
        '<div class="ngSnap ngSnap-shelves">',
          '<div ng-transclude></div>',
        '</div>'
      ].join('')
    };
  });
