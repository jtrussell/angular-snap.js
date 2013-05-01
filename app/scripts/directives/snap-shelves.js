/*global angular */

'use strict';

angular.module('demo')
  .directive('snapShelves', function () {
    return {
      restrict: 'A',
      transclude: true,
      template: [
        '<div class="ngSnap ngSnap-shelves">',
          '<div ng-transclude></div>',
        '</div>',
      ].join('')
    };
  });
