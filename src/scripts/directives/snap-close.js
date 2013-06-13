angular.module('snap')
  .directive('snapClose', function() {
    'use strict';
    return function (scope, element, attrs) {
      element.bind('click', function() {
        if (scope.snapper !== undefined) {
          scope.snapper.close();
        }
      });
    };
  });
