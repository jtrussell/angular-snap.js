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

    element = angular.element(button);
    element = $compile(element)(scope);
  }));

  describe('behaviour', function() {
    it('should delegate to the snapRemote service', inject(function(snapRemote) {
      spyOn(snapRemote, 'close');
      element[0].click();
      expect(snapRemote.close).toHaveBeenCalled();
    }));
  });
});
