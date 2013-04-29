/*global angular, Snap */

'use strict';

angular.module('demo')
  .directive('snapContent', function () {
    return {
      template: [
        '<div class="ngSnap ngSnap-content-wrapper">',
          '<div class="ngSnap-content">',
            '<div ng-transclude></div>',
          '</div>',
        '</div>'
      ].join(''),
      restrict: 'A',
      transclude: true,
      link: function postLink(scope, element, attrs) {
        var el = element[0]
          , snapper = new Snap({
            element: el
          });
      }
    };
  });
