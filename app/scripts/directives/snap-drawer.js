'use strict';

angular.module('demo')
  .directive('snapDrawer', function () {
    return {
      template: [
        '<div class="ngSnap-drawer left">',
          '<div ng-transclude></div>',
        '</div>'
      ].join(''),
      restrict: 'A',
      transclude: true
    };
  });
