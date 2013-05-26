/*global angular */

angular.module('snap')
  .directive('snapContent', [function () {
    'use strict';
    return {
      template: '<div class="ngSnap ngSnap-content" ng-transclude></div>',
      transclude: true,
      link: function postLink(scope, iElement, iAttrs) {

        // Find the shelves and set `minPosition`/`maxPosition` if they have
        // non-default widths
        // ...

        // Do we have a just a single left/right shelf? Disable the other side
        // ...

        var snapOptions = {
          element: iElement[0]
        };

        // override snap options if some provided in snap-options attribute
        if (angular.isDefined(iAttrs.snapOptions) && iAttrs.snapOptions) {
          angular.extend(snapOptions, scope.$eval(iAttrs.snapOptions));
        }

        var snapper = new window.Snap(snapOptions);

        // add toggle method
        snapper.toggle = function(target) {
          var method = (snapper.state().state === target)?'close':'open';
          snapper[method](target);
        };

        // publish to the scope so we have all builtin methods available in ng-click
        scope.snapper = snapper;
      }
    };
  }]);
