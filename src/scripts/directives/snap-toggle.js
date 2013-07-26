angular.module('snap')
  .directive('snapToggle', ['$rootScope', 'snapRemote', function($rootScope, snapRemote) {
      'use strict';
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          element.bind('click', function() {
            if (attrs.snapToggle) {
              snapRemote.toggle(attrs.snapToggle);
            } else {
              snapRemote.toggle('left');
            }
            $rootScope.$digest();
          });
        }
      };
  }]);
