angular.module('snap')
  .factory('snapSnapper', ['$q', function($q) {
    var deferred = $q.defer()
      , snapper = deferred.promise;

    return {
      get: function() {
        return snapper;
      },
      set: function(s) {
        snapper = s;
        if(deferred ) {
          deferred.resolve(s);
          deferred = null;
        }
      }
    };
  }]);
