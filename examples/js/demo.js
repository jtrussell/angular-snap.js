'use strict';

angular.module('demo', []);

angular.module('demo').factory('logger', function() {
  var exports = {};

  var getConsole = function() {
    return document.getElementById('console');
  };

  exports.info = function(msg) {
    var p = document.createElement('p');
    p.innerHTML = msg;
    getConsole().appendChild(p);
  };

  return exports;
});
