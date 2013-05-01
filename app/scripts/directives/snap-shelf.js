/*global angular */

'use strict';

angular.module('demo')
  .directive('snapShelf', function () {
    return {
      template: [
        '<div class="ngSnap-shelf left">',
          '<div ng-transclude></div>',
        '</div>'
      ].join(''),
      restrict: 'A',
      transclude: true,
      link: function(scope, element, attrs) {
        
        // -----------------------------------------------------
        // Get the width of element[0] and apply it to the shelf
        // -----------------------------------------------------

      }
    };
  });
