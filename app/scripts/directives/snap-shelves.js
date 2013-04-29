/*global angular */

'use strict';

angular.module('demo')
  .directive('snapShelves', function () {
    return {
      restrict: 'A',
      transclude: true,
      link: function postLink(scope, element, attrs) {
        //element.text('this is the ngSnap directive');
      },
      template: [
        '<div class="ngSnap ngSnap-shelves-wrapper">',
          '<div class="ngSnap-shelves" ng-transclude></div>',
        '</div>',
      ].join('')
    };
  });
