angular.module('snap')
  .directive('snapDrawers', function () {
    'use strict';
    return {
      restrict: 'AE',
      link: function(scope, element, attrs) {
        element.addClass('snap-drawers');
      }
    };
  });

