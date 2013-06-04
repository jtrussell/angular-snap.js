'use strict';

describe('Directive: snapDrawers', function () {
  beforeEach(module('snap'));

  var tpl = [
      '<div snap-drawers>',
        'shelves...',
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
    it('should provide a wrapper for individual shelves', function() {
      expect(element.text()).toBe('shelves...');
    });

    it('should have class names our stylesheets rely on', function() {
      expect(element.hasClass('snap-drawers')).toBe(true);
    });
  });
});
