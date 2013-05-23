/*global angular, Snap */

angular.module('snap')
  .directive('snapContent', [function () {
    'use strict';
    return {
      template: '<div class="ngSnap ngSnap-content" ng-transclude></div>',
      restrict: 'A',
      transclude: true,
      link: function postLink(scope, iElement, iAttrs) {

        // -----------------------------------------------------
        // If we have jQuery find the shelves and set the max and min positions
        // accordingly
        // -----------------------------------------------------
        var snapOptions = {
          element: iElement[0]
        };
        // override snap options if some provided in snap-options attribute
        if (angular.isDefined(iAttrs.snapOptions)) {
          angular.extend(snapOptions, angular.fromJson(iAttrs.snapOptions));
        }
        var snapper = new Snap(snapOptions);

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
