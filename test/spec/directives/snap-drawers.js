
describe('Directive: snapDrawers', function () {
  'use strict';

  beforeEach(module('snap'));

  var tpl
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
    beforeEach(inject(function($rootScope, $compile) {
      tpl = [
        '<div snap-drawers>',
          'shelves...',
        '</div>'
      ].join('');

      rootScope = $rootScope;
      compile = $compile;

      element = angular.element(tpl);
      element = compile(element)(rootScope);
    }));

    it('should provide a wrapper for individual shelves', function() {
      expect(element.text()).toBe('shelves...');
    });

    it('should have class names our stylesheets rely on', function() {
      expect(element.hasClass('snap-drawers')).toBe(true);
    });
  });

  describe('restrict AE', function() {
    beforeEach(inject(function($rootScope, $compile) {
      tpl = [
        '<snap-drawers>',
          'shelves...',
        '</snap-drawers>'
      ].join('');

      rootScope = $rootScope;
      compile = $compile;

      element = angular.element(tpl);
      element = compile(element)(rootScope);
    }));

    it('should provide a wrapper for individual shelves', function() {
      expect(element.text()).toBe('shelves...');
    });

    it('should have class names our stylesheets rely on', function() {
      expect(element.hasClass('snap-drawers')).toBe(true);
    });
  });
});
