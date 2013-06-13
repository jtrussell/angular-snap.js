/*global describe, beforeEach, module, jasmine, inject, angular, it, expect */
/*jshint node:true */

'use strict';

describe('Directive: snapClose', function() {
  beforeEach(module('snap'));

  var button = [
      '<button snap-close>',
        'awesome content',
      '</button>'
      ].join('');

  var element;

  describe('behaviour', function() {
    it('should call snapper close method', inject(function($rootScope, $compile) {
      element = angular.element(button);
      element = $compile(element)($rootScope);

      spyOn($rootScope.snapper, 'close');

      element.find('button')[0].click();
      expect($rootScope.snapper.close).toHaveBeenCalled();

    }));
  });
});
