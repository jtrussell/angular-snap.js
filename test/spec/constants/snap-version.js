/*global describe, beforeEach, module, inject, it, expect */
/*jshint node:true */

'use strict';

var pkg = require('../../../package.json');

describe('Constant: SNAP_VERSION', function() {
  beforeEach(module('snap'));
  
  var version;

  beforeEach(inject(function(SNAP_VERSION) {
    version = SNAP_VERSION;
  }));

  describe('The version constant', function() {
    it('should match the package.json version', function() {
      expect(version).to.be(pkg.version);
    });
  });
});

