/*global describe, beforeEach, module, jasmine, inject, angular, it, expect */
/*jshint node:true */

'use strict';

describe('Directive: snapDrawer', function() {
  beforeEach(module('snap'));

  var tpl = [
      '<div snap-drawer>',
        'awesome content',
      '</div>'
    ].join('')
    , element
    , rootScope
    , compile;

  beforeEach(inject(function($rootScope, $compile) {
    rootScope = $rootScope;
    compile = $compile;

    element = angular.element(tpl);
    element = compile(element)(rootScope);
  }));

  describe('basics', function() {
    it('should show our shelf content', function() {
      expect(element.text()).toBe('awesome content');
    });

    it('should have class names our stylesheets rely on', function() {
      expect(element.hasClass('snap-drawer')).toBe(true);
    });
  });

  describe('lone shelf', function() {
    it('should wrap itself in snap-drawers if it is not already', function() {
      expect(element.parent().hasClass('snap-drawers')).toBe(true);
    });
  });
});
