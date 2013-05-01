/*global angular, Snap */

'use strict';

angular.module('demo')
  .directive('snapContent', function () {
    return {
      template: [
        '<div class="ngSnap ngSnap-content">',
          '<div ng-transclude></div>',
        '</div>'
      ].join(''),
      restrict: 'A',
      transclude: true,
      link: function postLink(scope, element, attrs) {

        // -----------------------------------------------------
        // If we have jQuery find the shelves and set the max and min positions
        // accordingly
        // -----------------------------------------------------

        var el = element[0]
          , snapper = new Snap({
            element: el
          });
      }
    };
  });
