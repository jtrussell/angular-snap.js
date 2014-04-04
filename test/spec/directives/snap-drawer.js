/*global describe, beforeEach, module, jasmine, inject, angular, it, expect */
/*jshint node:true */

'use strict';

describe('Directive: snapDrawer', function() {
  beforeEach(module('snap'));

  var tpls = [[
      '<div snap-drawer>',
        'awesome content',
      '</div>'
    ].join(''),
    [
      '<snap-drawer>',
        'awesome content',
      '</snap-drawer>'
    ].join('')]
    , element
    , scope
    , mkEl;

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();

    mkEl = function(tpl, scp) {
      var $el = $compile(angular.element(tpl))(scp);
      scp.$apply();
      return $el;
    };
  }));

  angular.forEach(tpls, function(tpl) {
    beforeEach(function() {
      element = mkEl(tpl, scope);
    });

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

  describe('multiples', function() {
    var element, tpl = [
      '<snap-drawers>',
        '<div snap-drawer="left">',
          'left side',
        '</div>',
        '<div snap-drawer="right">',
          'right side',
        '</div>',
      '</snap-drawers>'
    ].join('');

    beforeEach(function() {
      element = mkEl(tpl, scope);
    });

    it('should not wrap itself in extra drawers', function() {
      expect(element.children().eq(0).hasClass('snap-drawers')).toBe(false);
      expect(element.children().eq(1).html()).toBe('right side');
    });
  });

});
