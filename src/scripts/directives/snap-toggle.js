angular.module('snap')
  .directive('snapToggle', function() {
      'use strict';
      return function (scope, element, attrs) {
        element.bind('click', function() {
            if (scope.snapper !== undefined) {
              if (attrs.snapToggle) {
                scope.snapper.toggle(attrs.snapToggle);
              } else {
                scope.snapper.toggle('left');
              }
            }
        });
      };
  });
