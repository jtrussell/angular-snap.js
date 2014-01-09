/*global describe, beforeEach, module, jasmine, inject, angular, it, expect, spyOn */
/*jshint node:true, camelcase:false */

'use strict';

describe('Directive: snapToggle', function() {
  beforeEach(module('snap'));

  var button = '<button snap-toggle>foo</button>'
    , rightButton = '<button snap-toggle="right" snap-id="\'mySnapId\'">foo</button>'
    , snapRemote
    , compile
    , scope;

  beforeEach(inject(function($rootScope, $compile, _snapRemote_) {
    scope = $rootScope.$new();
    compile = $compile;
    snapRemote = _snapRemote_;
    spyOn(snapRemote, 'toggle');
  }));

  describe('behaviour', function() {
    it('should call snapper toggle method on the left snap', function() {
      var element = angular.element(button);
      element = compile(element)(scope);
      element[0].click();
      expect(snapRemote.toggle.mostRecentCall.args[0]).toEqual('left');
      expect(snapRemote.toggle.mostRecentCall.args[1]).toBeUndefined();
    });

    it('should call snapper toggle method on the right snap', function() {
      var element = angular.element(rightButton);
      element = compile(element)(scope);
      element[0].click();
      expect(snapRemote.toggle.mostRecentCall.args[0]).toEqual('right');
      expect(snapRemote.toggle.mostRecentCall.args[1]).toEqual('mySnapId');
    });
  });
});
