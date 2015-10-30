/*global describe, beforeEach, module, jasmine, inject, angular, it, expect, spyOn */
/*jshint node:true */

'use strict';

describe('Provider: SnapConstructor', function() {
  
  it('should look for Snap on the window by default', function() {
    var S, $window;
    module('snap');
    inject(function(_$window_, $injector) {
      $window = _$window_;
      $window.Snap = {a: 'wowza'};
      S = $injector.get('SnapConstructor');
    });
    expect(S.a).toBe('wowza');

    // Cleanup
    $window.Snap = undefined;
  });

  it('should allow you to provide your own Snap constructor', function() {
    var S;
    module('snap');
    module(function(SnapConstructorProvider) {
      SnapConstructorProvider.use({b: 'foobar'});
    });
    inject(function(SnapConstructor) {
      S = SnapConstructor;
    });
    expect(S.b).toBe('foobar');
  });

  it('should throw when injected if there is no Snap', function() {
    module('snap');
    var f = function() {
      inject(function(SnapConstructor) {
        /* Should throw and never get here */
      });
    };
    expect(f).toThrow();
  });
});
