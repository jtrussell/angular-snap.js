/*global angular */

(function() {
  var version = [1, 3, 2]
    , vObj = {
        full: version.join('.'),
        major: version[0],
        minor: version[1],
        patch: version[2]
      };
  angular.module('snap').constant('SNAP_VERSION', vObj);
}());
