angular.module('snap')
  .directive('snapToggle', function() {
      'use strict';
      return function (scope, element, attr) {
        element.bind('click', function() {
            if (element.scope().snapper !== undefined) {
              if (attr.snapToggle) {
                element.scope().snapper.toggle(attr.snapToggle);
              } else {
                element.scope().snapper.toggle('left');
              }
            }
        });
      };
  });
