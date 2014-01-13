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

        angular.extend(snapOptions, snapRemote.globalOptions);

        var snapId = attrs.snapId;
        if(!!snapId) {
          snapId = scope.$eval(attrs.snapId);
        }

        // override snap options if some provided in snap-options attribute
        if(angular.isDefined(attrs.snapOptions) && attrs.snapOptions) {
          angular.extend(snapOptions, scope.$eval(attrs.snapOptions));
        }

        snapRemote.register(new window.Snap(snapOptions), snapId);

        // watch snapOptions for updates
        if(angular.isDefined(attrs.snapOptions) && attrs.snapOptions) {
          scope.$watch(attrs.snapOptions, function(newSnapOptions) {
            snapRemote.getSnapper(snapId).then(function(snapper) {
              snapper.settings(newSnapOptions);
            });
          }, true);
        }

        scope.$on('$destroy', function() {
          snapRemote.unregister(snapId);
        });
      }
    };
  }]);
