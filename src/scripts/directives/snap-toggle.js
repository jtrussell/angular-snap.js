angular.module('snap')
  .directive('snapToggle', function() {
      'use strict';
      return function (scope, element, attr) {
        element.bind('click', function() {
            if (scope.snapper !== undefined) {
              if (attr.snapToggle) {
                scope.snapper.toggle(attr.snapToggle);
              } else {
                scope.snapper.toggle('left');
              }
            }
        });
      };
  });
