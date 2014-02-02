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
