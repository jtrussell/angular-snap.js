/*global describe, beforeEach, module, jasmine, inject, angular, it, expect, spyOn */
/*jshint node:true */

'use strict';

ddescribe('Directive: snapDragger', function() {
  beforeEach(module('snap'));

  var tpl = [
      '<snap-content>',
        '<div class="my-dragger" snap-dragger>foo</div>',
      '</snap-content>'
    ].join('')
    , snapRemote
    , compile
    , scope;

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    compile = $compile;
  }));

  describe('behaviour', function() {
    it('should pass through our dragger to the Snap.js contstructor', function() {
      var element = angular.element(tpl);
      element = compile(element)(scope);
      scope.$apply();
    });

  });
});

