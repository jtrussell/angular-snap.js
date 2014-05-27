angular.module('snap')
.provider('SnapConstructor', function() {
  'use strict';
  var constructor = window.Snap;

  this.use = function(Snap) {
    constructor = Snap;
  };

  this.$get = function() {
    return constructor;
  };
});

