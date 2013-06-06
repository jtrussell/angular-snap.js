/*global describe, beforeEach, module, jasmine, inject, angular, it, expect */
/*jshint node:true */

'use strict';

describe('Directive: snapToggle', function() {
  beforeEach(module('snap'));

  var button = '<button snap-toggle>foo</button>'
    , rightButton = '<button snap-toggle="right">foo</button>'
    , scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
    scope.snapper = {
      toggle: angular.noop
    };
    spyOn(scope.snapper, 'toggle');
  }));

  describe('behaviour', function() {
    it('should call snapper toggle method on the left snap', inject(function($compile) {
      var element = angular.element(button);
      element = $compile(element)(scope);
      element[0].click();
      expect(scope.snapper.toggle).toHaveBeenCalledWith('left');
    }));

    it('should call snapper toggle method on the right snap', inject(function($rootScope, $compile) {
      var element = angular.element(rightButton);
      element = $compile(element)(scope);
      element[0].click();
      expect(scope.snapper.toggle).toHaveBeenCalledWith('right');
    }));
  });
});
