/*global require, describe, beforeEach, module, inject, it, expect */

'use strict';

describe('Constant: SNAP_VERSION', function() {
  beforeEach(module('snap'));

  var version;

  beforeEach(inject(function(SNAP_VERSION) {
    version = SNAP_VERSION;
  }));

  describe('The version constant', function() {
    it('should match the package.json version', function() {
      expect(version.full).toBe(window.SNAP.version);
    });
  });
});

