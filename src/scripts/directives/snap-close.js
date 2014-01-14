angular.module('snap')
  .directive('snapClose', ['$rootScope', 'snapRemote', function($rootScope, snapRemote) {
    'use strict';
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.bind('click', function() {
          // Wrap in anonymous function for easier testing
          snapRemote.close(scope.$eval(attrs.snapId));
          $rootScope.$digest();
        });
      }
    };
  }]);
