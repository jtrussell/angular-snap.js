angular.module('snap', []);

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
        if(angular.isDefined(iAttrs.snapOptions) && iAttrs.snapOptions) {
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

        // watch snapOptions for updates
        if(angular.isDefined(iAttrs.snapOptions) && iAttrs.snapOptions) {
          scope.$watch(iAttrs.snapOptions, function(newSnapOptions) {
            snapper.settings(newSnapOptions);
          }, true);
        }
      }
    };
  }]);

angular.module('snap')
  .directive('snapShelf', function () {
    'use strict';
    return {
      template: '<div class="ngSnap-shelf" ng-transclude></div>',
      transclude: true,
      replace: true,
      link: function(scope, iElement, iAttrs) {

        // Don't force a `snap-shelves` wrapper when we only want to use a
        // single shelf
        var iParent = iElement.parent()
          , needsShelvesWrapper = true;

        while(iParent.length) {
          if(iParent.hasClass('ngSnap-shelves')) {
            needsShelvesWrapper = false;
          }
          iParent = iParent.parent();
        }

        if(needsShelvesWrapper) {
          iElement.wrap('<div class="ngSnap ngSnap-shelves" />');

          // If we only have a single shelf probably
          if(iElement.hasClass('left')) {
            // disable snapper 'right' side
          }

          if(iElement.hasClass('right')) {
            // disable snapper 'left' side
          }
        }

        // Get the width of element[0] and apply it to the shelf
        // ...

      }
    };
  });

angular.module('snap')
  .directive('snapShelves', function () {
    'use strict';
    return {
      transclude: true,
      replace: true,
      template: '<div class="ngSnap ngSnap-shelves" ng-transclude></div>'
    };
  });

angular.module('snap')
  .directive('snapToggle', function() {
      'use strict';
      return function (scope, element, attr) {
        element.bind('click', function() {
            if (element.scope().snapper !== undefined) {
              if (attr.snapToggle) {
                element.scope().snapper.toggle(attr.snapToggle);
              } else {
                element.scope().snapper.toggle('left');
              }
            }
        });
      };
  });
