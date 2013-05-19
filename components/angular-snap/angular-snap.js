angular.module('snap', []);

angular.module('snap')
  .directive('snapContent', function () {
    'use strict';
    return {
      template: [
        '<div class="ngSnap ngSnap-content">',
          '<div ng-transclude></div>',
        '</div>'
      ].join(''),
      restrict: 'A',
      transclude: true,
      link: function postLink(scope, element, attrs) {

        // -----------------------------------------------------
        // If we have jQuery find the shelves and set the max and min positions
        // accordingly
        // -----------------------------------------------------

        var el = element[0]
          , snapper = new Snap({
            element: el
          });
      }
    };
  });

angular.module('snap')
  .directive('snapShelf', function () {
    'use strict';
    return {
      template: [
        '<div class="ngSnap-shelf left">',
          '<div ng-transclude></div>',
        '</div>'
      ].join(''),
      restrict: 'A',
      transclude: true,
      link: function(scope, element, attrs) {
        
        // -----------------------------------------------------
        // Get the width of element[0] and apply it to the shelf
        // -----------------------------------------------------

      }
    };
  });

angular.module('snap')
  .directive('snapShelves', function () {
    'use strict';
    return {
      restrict: 'A',
      transclude: true,
      template: [
        '<div class="ngSnap ngSnap-shelves">',
          '<div ng-transclude></div>',
        '</div>'
      ].join('')
    };
  });
