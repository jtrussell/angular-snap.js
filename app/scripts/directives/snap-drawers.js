/*global angular */

'use strict';

angular.module('demo')
  .directive('snapDrawers', function () {
    return {
      restrict: 'A',
      transclude: true,
      link: function postLink(scope, element, attrs) {
        //element.text('this is the ngSnap directive');
      },
      template: [
        '<div class="ngSnap ngSnap-drawers-wrapper">',
          '<div class="ngSnap-drawers">',
            '<div ng-transclude></div>',
          '</div>',
        '</div>',
      ].join('')
    };
  });
