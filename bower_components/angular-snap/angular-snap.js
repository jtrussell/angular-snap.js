angular.module('snap', []);

(function() {
  'use strict';
  var version = [1, 4, 0]
    , vObj = {
        full: version.join('.'),
        major: version[0],
        minor: version[1],
        patch: version[2]
      };
  angular.module('snap').constant('SNAP_VERSION', vObj);
}());

angular.module('snap')
  .directive('snapClose', ['$rootScope', 'snapRemote', function($rootScope, snapRemote) {
    'use strict';
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.bind('click', function() {
          // Wrap in anonymous function for easier testing
          snapRemote.close(scope.$eval(attrs.snapId));
          $rootScope.$digest();
        });
      }
    };
  }]);

angular.module('snap')
  .directive('snapContent', ['snapRemote', function (snapRemote) {
    'use strict';
    return {
      restrict: 'AE',
      link: function postLink(scope, element, attrs) {
        element.addClass('snap-content');

        var snapOptions = {
          element: element[0]
        };

        angular.extend(snapOptions, snapRemote.globalOptions);

        var snapId = attrs.snapId;
        if(!!snapId) {
          snapId = scope.$eval(attrs.snapId);
        }

        // override snap options if some provided in snap-options attribute
        if(angular.isDefined(attrs.snapOptions) && attrs.snapOptions) {
          angular.extend(snapOptions, scope.$eval(attrs.snapOptions));
        }

        snapRemote.register(new window.Snap(snapOptions), snapId);

        // watch snapOptions for updates
        if(angular.isDefined(attrs.snapOptions) && attrs.snapOptions) {
          scope.$watch(attrs.snapOptions, function(newSnapOptions) {
            snapRemote.getSnapper(snapId).then(function(snapper) {
              snapper.settings(newSnapOptions);
            });
          }, true);
        }

        scope.$on('$destroy', function() {
          snapRemote.unregister(snapId);
        });
      }
    };
  }]);

angular.module('snap')
  .directive('snapDragger', ['snapRemote', function(snapRemote) {
    'use strict';
    return {
      restrict: 'AE',
      link: function(scope, element, attrs) {
        var snapId = scope.$eval(attrs.snapId);
        snapRemote.getSnapper(snapId).then(function(snapper) {
          snapper.settings({
            dragger: element[0]
          });
        });
      }
    };
  }]);


angular.module('snap')
  .directive('snapDrawer', function () {
    'use strict';
    return {
      restrict: 'AE',
      link: function(scope, element, attrs) {
        element.addClass('snap-drawer');

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
      restrict: 'AE',
      link: function(scope, element, attrs) {
        element.addClass('snap-drawers');
      }
    };
  });


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

          element.bind('click', function() {
            snapRemote.toggle(snapSide, snapId);
            $rootScope.$digest();
          });
        }
      };
  }]);

angular.module('snap')
.provider('snapRemote', function SnapRemoteProvider() {
  'use strict';

  // Global Snap.js options
  var self = this;
  this.globalOptions = {};

  this.$get = ['$q', function($q) {

    var snapperStore = {}
      , DEFAULT_SNAPPER_ID = '__DEFAULT_SNAPPER_ID__'
      , exports = {}
      , initStoreForId
      , resolveInStoreById;

    exports.globalOptions = self.globalOptions;

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

    exports.unregister = function(id) {
      id = id || DEFAULT_SNAPPER_ID;
      if(snapperStore.hasOwnProperty(id)) {
        delete snapperStore[id];
      }
    };

    exports.toggle = function(side, id) {
      id = id || DEFAULT_SNAPPER_ID;
      exports.getSnapper(id).then(function(snapper) {
        if(side === snapper.state().state) {
          exports.close(id);
        } else {
          exports.open(side, id);
        }
      });
    };

    exports.open = function(side, id) {
      id = id || DEFAULT_SNAPPER_ID;
      exports.getSnapper(id).then(function(snapper) {
        snapper.open(side);
      });
    };

    exports.close = function(id) {
      id = id || DEFAULT_SNAPPER_ID;
      exports.getSnapper(id).then(function(snapper) {
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
  }];

  return this;
});
