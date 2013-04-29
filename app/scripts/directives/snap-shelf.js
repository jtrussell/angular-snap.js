/*global angular */

'use strict';

angular.module('demo')
  .directive('snapShelf', function () {
    return {
      template: [
        '<div class="ngSnap-shelf">',
          '<div ng-transclude></div>',
        '</div>'
      ].join(''),
      restrict: 'A',
      transclude: true
    };
  });
