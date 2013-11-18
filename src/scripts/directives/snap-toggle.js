angular.module('snap')
  .directive('snapToggle', ['$rootScope', 'snapRemote', function($rootScope, snapRemote) {
      'use strict';
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var snapId = attrs.snapId
            , snapSide = attrs.snapToggle || 'left';

          if(!!snapId) {
            snapId = scope.$eval(snapId);
          }

          element.bind('click', function() {
            snapRemote.toggle(snapSide, snapId);
            $rootScope.$digest();
          });
        }
      };
  }]);
