angular.module('snap')
  .directive('snapToggle', ['$rootScope', 'snapRemote', function($rootScope, snapRemote) {
      'use strict';
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var snapId = attrs.snapId
            , snapSide = attrs.snapToggle || 'left';

          if(!!snapId) {
            snapId = scope.$eval(snapId);
          }

          /**
           * Stifle mousedown and mouseup events by default
           *
           * See issue #61
           *
           * mousedown can create a race condition with the Snap.js `tapToClose`
           * setting, the `tapToClose` handler runs first (if drawer is open)
           * then our toggle handler runs. Depending on how far along in the
           * close animation the drawer is when the toggle handler runs we may
           * end up keeping the drawer open (i.e. a quick open/close) or *only*
           * performing a double close.
           *
           * The situation is trickier because we want to allow mouseup events
           * to flow through **if** the corresponding mousedown event did not
           * target out toggle button... otherwise you could get stuck in a
           * drag. We have a naive approach to preventing this... you can still
           * get stuck in drag temporarily if you: mouse down on the toggle
           * button, then mouse up off screen, then start a drag, then mouse
           * down on the toggle button.
           */
          if(!attrs.snapUnsafe) {
            var downOnMe = false;
            element.bind('mousedown', function(event) {
              downOnMe = true;
              event.stopImmediatePropagation();
            });

            element.bind('mouseup', function(event) {
              if(downOnMe) {
                event.stopImmediatePropagation();
              }
              downOnMe = false;
            });
          }

          element.bind('click', function() {
            snapRemote.toggle(snapSide, snapId);
            $rootScope.$digest();
          });
        }
      };
  }]);
