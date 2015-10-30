angular.module('snap')
.provider('SnapConstructor', function() {
  'use strict';
  var constructor;

  this.use = function(MySnap) {
    constructor = MySnap;
  };

  this.$get = ['$window', function($window) {
    var S = constructor || $window.Snap;
    if(angular.isUndefined(S)) {
      throw new Error('Snap constructor is not defined. Make sure ' +
          'window.Snap is defined or supply your own with ' +
          'SnapConstructorProvider.use(MySnap).');
    }
    return S;
  }];
});

