/*global describe, beforeEach, module, jasmine, inject, angular, it, expect */
/*jshint node:true */

'use strict';

describe('Directive: snapToggle', function() {
  beforeEach(module('snap'));

  var button = [
      '<div snap-content><button snap-toggle>',
        'awesome content',
      '</button></div>'
      ].join('');

  var rightButton = [
      '<div snap-content><button snap-toggle="right">',
        'awesome content',
      '</button></div>'
      ].join('');

  var element;

  describe('behaviour', function() {
    it('should call snapper toggle method on the left snap', inject(function($rootScope, $compile) {
      element = angular.element(button);
      element = $compile(element)($rootScope);

      spyOn($rootScope.snapper, 'toggle');

      element.find('button')[0].click();
      expect($rootScope.snapper.toggle).toHaveBeenCalledWith('left');

    }));

    it('should call snapper toggle method on the right snap', inject(function($rootScope, $compile) {
      element = angular.element(rightButton);
      element = $compile(element)($rootScope);

      spyOn($rootScope.snapper, 'toggle');
      
      element.find('button')[0].click();
      expect($rootScope.snapper.toggle).toHaveBeenCalledWith('right');

    }));
  });
});
