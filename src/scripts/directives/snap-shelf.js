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
