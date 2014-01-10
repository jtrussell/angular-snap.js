angular.module('snap')
  .directive('snapDragger', ['snapRemote', function(snapRemote) {
    'use strict';
    return {
      restrict: 'AE',
      link: function(scope, element, attrs) {
        var snapId = scope.$eval(attrs.snapId);
        snapRemote.getSnapper(snapId).then(function(snapper) {
          snapper.settings({
            dragger: element[0]
          });
        });
      }
    };
  }]);

