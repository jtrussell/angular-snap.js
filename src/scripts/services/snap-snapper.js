angular.module('snap')
  .factory('snapSnapper', [function() {
    var snapper = null;

    // Provide direct access to the snapper object and a few convenience methods
    // for our directives.

    return {
      // Used internally. If you're creating your own snapper object why are you
      // bothering with angular-snap?
      _set: function(s) {
        snapper = s;
      },

      // Returns null until our `snap-content` initializes
      get: function() {
        return snapper;
      },

      toggle: function(side) {
        // code...
      },

      open: function(side) {
        // code...
      },

      close: function() {
        // code...
      }
    };
  }]);
