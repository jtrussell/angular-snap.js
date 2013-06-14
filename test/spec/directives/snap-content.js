/*global describe, beforeEach, module, jasmine, inject, angular, it, expect */
/*jshint node:true */

'use strict';

describe('Directive: snapContent', function() {
  beforeEach(module('snap'));

  var tpl = [
      '<div id="mySnapContent" snap-content>',
        'main stuffs',
      '</div>'
    ].join('')
    , element
    , rootScope
    , scope
    , compile
    , SnapSpy;

  beforeEach(function() {
    SnapSpy = jasmine.createSpy('Snap').andReturn({
      settings: jasmine.createSpy('settings')
    });
    window.Snap = SnapSpy;
  });

  beforeEach(inject(function($rootScope, $compile) {
    rootScope = $rootScope;
    compile = $compile;

    element = angular.element(tpl);
    element = compile(element)(rootScope);
    //element = element.children(); // snap-content does not replace
  }));

  describe('basics', function() {
    it('should show its contents', function() {
      expect(element.text()).toBe('main stuffs');
    });

    it('should have class names our stylesheets rely on', function() {
      expect(element.hasClass('snap-content')).toBe(true);
    });
  });

  describe('Snap.js configuration', function() {
    describe('default options', function() {
      it('should create a new Snap instance', function() {
        expect(SnapSpy).toHaveBeenCalledWith({
          element: jasmine.any(Object)
        });

        expect(SnapSpy.mostRecentCall.args[0].element.id).toBe('mySnapContent');
      });
    });

    describe('custom options', function() {
      beforeEach(function() {
        scope = rootScope.$new();
        scope.opts = {
          customOpt: 'some custom option'
        };

        tpl = [
          '<div id="mySnapContent" snap-content snap-options="opts">',
            'main stuffs',
          '</div>'
        ].join('');

        element = angular.element(tpl);
        element = compile(element)(scope);
        element = element.children(); // snap-content does not replace
      });

      it('should pass through custom options to Snap constructor', function() {
        expect(SnapSpy.mostRecentCall.args[0].customOpt)
          .toBe('some custom option');
      });

      it('should *always* have fall back to the attached element', function() {
        expect(SnapSpy.mostRecentCall.args[0].element.id).toBe('mySnapContent');
      });

      it('should update Snap settings when configs are changed at runtime',
          function() {
        scope.opts.customOpt = 'some new custom option';
        scope.$digest();
        expect(scope.snapper.settings).toHaveBeenCalledWith({
          customOpt: 'some new custom option'
        });
      });
    });

  });

  describe('toggle method', function() {
    console.log('[todo] test toggle method [/todo]');
  });

  describe('Element level directive', function() {
    beforeEach(function() {
      element = angular.element([
        '<snap-content id="mySnapContent">',
          'main stuffs',
        '</snap-content>'
      ].join(''));
      element = compile(element)(rootScope);
    });

    it('should show its contents', function() {
      expect(element.text()).toBe('main stuffs');
    });

    it('should have class names our stylesheets rely on', function() {
      expect(element.hasClass('snap-content')).toBe(true);
    });
  });


});
