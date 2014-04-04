angular.module('snap')
  .directive('snapDrawers', function () {
    'use strict';
    return {
      restrict: 'AE',
      compile: function(element, attrs) {
        element.addClass('snap-drawers');
      }
    };
  });

