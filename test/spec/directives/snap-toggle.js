/*global describe, beforeEach, module, jasmine, inject, angular, it, expect, spyOn */
/*jshint node:true, camelcase:false */

'use strict';

describe('Directive: snapToggle', function() {
  beforeEach(module('snap'));

  var button = '<button snap-toggle>foo</button>'
    , rightButton = '<button snap-toggle="right">foo</button>'
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
    it('should call snapper toggle method on the left snap', inject(function($compile) {
      var element = angular.element(button);
      element = compile(element)(scope);
      element[0].click();
      expect(snapRemote.toggle).toHaveBeenCalledWith('left');
    }));

    it('should call snapper toggle method on the right snap', inject(function($rootScope, $compile) {
      var element = angular.element(rightButton);
      element = compile(element)(scope);
      element[0].click();
      expect(snapRemote.toggle).toHaveBeenCalledWith('right');
    }));
  });
});
