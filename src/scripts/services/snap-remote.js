angular.module('snap')
  .factory('snapRemote', [function() {
    'use strict';

    // Provide direct access to the snapper object and a few convenience methods
    // for our directives.

    var snapper = null
      , exports;
  
    exports = {
      // Returns null until our `snap-content` initializes
      get: function() {
        return snapper;
      },

      // Eventually we may want to allow for multiple snap instances
      register: function(snppr) {
        snapper = snppr;
      },

      toggle: function(side) {
        var snppr = exports.get()
          , method;
        if(snppr) {
          method = (snppr.state().state === side) ? 'close' : 'open';
          snppr[method](side);
        }
      },

      open: function(side) {
        var snppr = exports.get();
        if(snppr) {
          snppr.open(side);
        }
      },

      close: function() {
        var snppr = exports.get();
        if(snppr) {
          snppr.close();
        }
      }
    };

    return exports;
  }]);
