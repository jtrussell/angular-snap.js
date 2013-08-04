angular.module('snap', []);

angular.module('snap')
  .directive('snapClose', ['$rootScope', 'snapRemote', function($rootScope, snapRemote) {
    'use strict';
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.bind('click', function() {
          // Wrap in anonymous function for easier testing
          snapRemote.close();
          $rootScope.$digest();
        });
      }
    };
  }]);

angular.module('snap')
  .directive('snapContent', ['snapRemote', function (snapRemote) {
    'use strict';
    return {
      template: '<div class="snap-content" ng-transclude></div>',
      transclude: true,
      replace: true,
      restrict: 'AE',
      link: function postLink(scope, element, attrs) {
        var snapOptions = {
          element: element[0]
        };

        // override snap options if some provided in snap-options attribute
        if(angular.isDefined(attrs.snapOptions) && attrs.snapOptions) {
          angular.extend(snapOptions, scope.$eval(attrs.snapOptions));
        }

        snapRemote.register(new window.Snap(snapOptions));

        // watch snapOptions for updates
        if(angular.isDefined(attrs.snapOptions) && attrs.snapOptions) {
          scope.$watch(attrs.snapOptions, function(newSnapOptions) {
            snapRemote.getSnapper().then(function(snapper) {
              snapper.settings(newSnapOptions);
            });
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

      }
    };
  });

angular.module('snap')
  .directive('snapDrawers', function () {
    'use strict';
    return {
      transclude: true,
      replace: true,
      restrict: 'AE',
      template: '<div class="snap-drawers" ng-transclude></div>'
    };
  });

angular.module('snap')
  .directive('snapToggle', ['$rootScope', 'snapRemote', function($rootScope, snapRemote) {
      'use strict';
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          element.bind('click', function() {
            if (attrs.snapToggle) {
              snapRemote.toggle(attrs.snapToggle);
            } else {
              snapRemote.toggle('left');
            }
            $rootScope.$digest();
          });
        }
      };
  }]);

angular.module('snap')
  .factory('snapRemote', ['$q', function($q) {
    'use strict';

    var snapperStore = {}
      , DEFAULT_SNAPPER_ID = '__DEFAULT_SNAPPER_ID__'
      , exports = {}
      , initStoreForId
      , resolveInStoreById;

    exports.getSnapper = function(id) {
      id = id || DEFAULT_SNAPPER_ID;
      if(!snapperStore.hasOwnProperty(id)) {
        initStoreForId(id);
      }
      return snapperStore[id].deferred.promise;
    };

    exports.register = function(snapper, id) {
      id = id || DEFAULT_SNAPPER_ID;
      if(!snapperStore.hasOwnProperty(id)) {
        initStoreForId(id);
      }
      if(snapperStore[id].isResolved) {
        initStoreForId(id);
      }
      resolveInStoreById(snapper, id);
    };

    exports.toggle = function(side, id) {
      id = id || DEFAULT_SNAPPER_ID;
      exports.getSnapper().then(function(snapper) {
        if(side === snapper.state().state) {
          exports.close(side);
        } else {
          exports.open(side);
        }
      });
    };

    exports.open = function(side, id) {
      id = id || DEFAULT_SNAPPER_ID;
      exports.getSnapper().then(function(snapper) {
        snapper.open(side);
      });
    };

    exports.close = function(id) {
      id = id || DEFAULT_SNAPPER_ID;
      exports.getSnapper().then(function(snapper) {
        snapper.close();
      });
    };

    initStoreForId = function(id) {
      snapperStore[id] = {
        deferred: $q.defer(),
        isResolved: false
      };
    };

    resolveInStoreById = function(snapper, id) {
      snapperStore[id].deferred.resolve(snapper);
      snapperStore[id].isResolved = true;
    };

    return exports;
  }]);
