angular.module('snap')
  .directive('snapContent', [function () {
    'use strict';
    return {
      template: '<div class="snap-content" ng-transclude></div>',
      transclude: true,
      replace: true,
      link: function postLink(scope, element, attrs) {

        // Find the shelves and set `minPosition`/`maxPosition` if they have
        // non-default widths
        // ...

        // Do we have a just a single left/right shelf? Disable the other side
        // ...

        var snapOptions = {
          element: element[0]
        };

        // override snap options if some provided in snap-options attribute
        if(angular.isDefined(attrs.snapOptions) && attrs.snapOptions) {
          angular.extend(snapOptions, scope.$eval(attrs.snapOptions));
        }

        var snapper = new window.Snap(snapOptions);

        // add toggle method
        snapper.toggle = function(target) {
          var method = (snapper.state().state === target)?'close':'open';
          snapper[method](target);
        };

        // publish to the scope so we have all builtin methods available in ng-click
        scope.snapper = snapper;

        // watch snapOptions for updates
        if(angular.isDefined(attrs.snapOptions) && attrs.snapOptions) {
          scope.$watch(attrs.snapOptions, function(newSnapOptions) {
            snapper.settings(newSnapOptions);
          }, true);
        }
      }
    };
  }]);
