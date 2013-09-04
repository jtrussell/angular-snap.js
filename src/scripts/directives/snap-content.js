angular.module('snap')
  .directive('snapContent', ['snapRemote', function (snapRemote) {
    'use strict';
    return {
      restrict: 'AE',
      link: function postLink(scope, element, attrs) {
        element.addClass('snap-content');

        var snapOptions = {
          element: element[0]
        };

        // override snap options if some provided in snap-options attribute
        if(angular.isDefined(attrs.snapOptions) && attrs.snapOptions) {
          angular.extend(snapOptions, scope.$eval(attrs.snapOptions));
        }

        snapRemote.register(new window.Snap(snapOptions));

        // watch snapOptions for updates
        if(angular.isDefined(attrs.snapOptions) && attrs.snapOptions) {
          scope.$watch(attrs.snapOptions, function(newSnapOptions) {
            snapRemote.getSnapper().then(function(snapper) {
              snapper.settings(newSnapOptions);
            });
          }, true);
        }
      }
    };
  }]);
