angular.module('snap', []);

angular.module('snap')
  .directive('snapClose', function() {
    'use strict';
    return function (scope, element, attrs) {
      element.bind('click', function() {
        if (scope.snapper !== undefined) {
          scope.snapper.close();
        }
      });
    };
  });

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

angular.module('snap')
  .directive('snapDrawer', function () {
    'use strict';
    return {
      template: '<div class="snap-drawer" ng-transclude></div>',
      transclude: true,
      replace: true,
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

angular.module('snap')
  .directive('snapDrawers', function () {
    'use strict';
    return {
      transclude: true,
      replace: true,
      template: '<div class="snap-drawers" ng-transclude></div>'
    };
  });

angular.module('snap')
  .directive('snapToggle', function() {
      'use strict';
      return function (scope, element, attrs) {
        element.bind('click', function() {
            if (scope.snapper !== undefined) {
              if (attrs.snapToggle) {
                scope.snapper.toggle(attrs.snapToggle);
              } else {
                scope.snapper.toggle('left');
              }
            }
        });
      };
  });
