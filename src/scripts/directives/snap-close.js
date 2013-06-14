angular.module('snap')
  .directive('snapClose', function() {
    'use strict';
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.bind('click', function() {
          if (scope.snapper !== undefined) {
            scope.snapper.close();
          }
        });
      }
    };
    
  });
