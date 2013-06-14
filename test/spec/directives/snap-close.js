/*global describe, beforeEach, module, jasmine, inject, angular, it, expect, spyOn */
/*jshint node:true */

'use strict';

describe('Directive: snapClose', function() {
  beforeEach(module('snap'));

  var button = [
      '<button snap-close>',
        'awesome content',
      '</button>'
      ].join('');

  var element
    , scope;

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();

    scope.snapper = {
      close: angular.noop
    };

    element = angular.element(button);
    element = $compile(element)(scope);
  }));

  describe('behaviour', function() {
    it('should call snapper close method', function() {
      spyOn(scope.snapper, 'close');
      element[0].click();
      expect(scope.snapper.close).toHaveBeenCalled();
    });
  });
});
