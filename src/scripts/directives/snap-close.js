angular.module('snap')
  .directive('snapClose', ['snapRemote', function(snapRemote) {
    'use strict';
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.bind('click', function() {
          // Wrap in anonymous function for easier testing
          snapRemote.close();
        });
      }
    };
  }]);
