/*global angular */

(function() {
  'use strict';
  var version = [1, 7, 0]
    , vObj = {
        full: version.join('.'),
        major: version[0],
        minor: version[1],
        patch: version[2]
      };
  angular.module('snap').constant('SNAP_VERSION', vObj);
}());
