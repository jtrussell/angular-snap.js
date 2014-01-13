/*global describe, beforeEach, module, jasmine, inject, angular, it, expect, spyOn */
/*jshint node:true */

'use strict';

describe('Directive: snapDragger', function() {
  beforeEach(module('snap'));

  var tpl = [
      '<snap-content>',
        '<div class="my-dragger" snap-dragger>foo</div>',
      '</snap-content>'
    ].join('')
    , snapRemote
    , compile
    , scope
    , snapperDummy
    , SnapSpy;

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    compile = $compile;
  }));

  beforeEach(function() {
    snapperDummy = {
      settings: jasmine.createSpy('settings')
    };

    SnapSpy = jasmine.createSpy('Snap').andReturn(snapperDummy);
    window.Snap = SnapSpy;
  });

  describe('behaviour', function() {
    it('should update the snapper settings to use the dragger', function() {
      var element = angular.element(tpl);
      element = compile(element)(scope);
      scope.$apply();

      expect(snapperDummy.settings).toHaveBeenCalledWith({
        dragger: element.find('div')[0]
      });
    });

  });
});

