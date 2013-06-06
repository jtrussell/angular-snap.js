angular.module('snap')
  .directive('snapDrawer', function () {
    'use strict';
    return {
      template: '<div class="snap-drawer" ng-transclude></div>',
      transclude: true,
      replace: true,
      restrict: 'AE',
      link: function(scope, element, attrs) {

        // Don't force a `snap-drawers` wrapper when we only want to use a
        // single shelf
        var parent = element.parent()
          , needsDrawersWrapper = true;

        if (attrs.snapDrawer === 'right') {
          element.addClass('snap-drawer-right');
        } else {
          element.addClass('snap-drawer-left');
        }

        while(parent.length) {
          if(parent.hasClass('snap-drawers')) {
            needsDrawersWrapper = false;
          }
          parent = parent.parent();
        }

        if(needsDrawersWrapper) {
          element.wrap('<div class="snap-drawers" />');
        }

        // Get the width of element[0] and apply it to the shelf
        // ...

      }
    };
  });
