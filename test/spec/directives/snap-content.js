/*global describe, beforeEach, module, jasmine, inject, angular, it, expect, spyOn */
/*jshint node:true */

'use strict';

/**
  * Define global snap options.
  * Since the config phase is already done inside it(),
  * I found nothing better than defining options out describe's scope
  * @see https://groups.google.com/forum/#!topic/angular/D00S1DqE3jM
  * @see http://jsfiddle.net/eitanp461/qTvMz/
  */
var myApp = angular.module('snap');

myApp.config(function(snapRemoteProvider) {
  snapRemoteProvider.globalOptions = {
    disable: 'right'
  };
});

myApp.config(function(snapRemoteProvider){
  snapRemoteProvider.globalOptions.overwritten = false;
});

describe('Directive: snapContent', function() {
  beforeEach(module('snap'));

  var tpl = [
      '<div id="mySnapContent" snap-content>',
        'main stuffs',
      '</div>'
    ].join('')
    , element
    , rootScope
    , compile
    , snapperDummy
    , SnapSpy;

  beforeEach(function() {
    snapperDummy = {
      settings: jasmine.createSpy('settings')
    };

    SnapSpy = jasmine.createSpy('Snap').andReturn(snapperDummy);
    window.Snap = SnapSpy;
  });

  beforeEach(inject(function($rootScope, $compile) {
    rootScope = $rootScope;
    compile = $compile;

    element = angular.element(tpl);
    element = compile(element)(rootScope);
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
          element: jasmine.any(Object),
          disable: 'right',
          overwritten: false
        });

        expect(SnapSpy.mostRecentCall.args[0].element.id).toBe('mySnapContent');
      });
    });

    describe('custom options', function() {
      var scope;
      beforeEach(function() {
        scope = rootScope.$new();
        scope.opts = {
          customOpt: 'some custom option',
          overwritten: true
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

      it('should inherit from global options', function() {
        expect(SnapSpy.mostRecentCall.args[0].disable).toBeDefined();
        expect(SnapSpy.mostRecentCall.args[0].disable).toBe('right');
      });

      it('should overwrite global Snap options', function() {
        expect(SnapSpy.mostRecentCall.args[0].overwritten).toBe(true);
      });

      it('should update Snap settings when configs are changed at runtime',
          function() {
        scope.opts.customOpt = 'some new custom option';
        scope.$apply();
        expect(snapperDummy.settings).toHaveBeenCalledWith(scope.opts);
      });
    });

    describe('snappers by id', function() {
      beforeEach(inject(function(snapRemote) {
        var scope = rootScope.$new();
        scope.snapIdFromScope = 'mySecondSnap';

        tpl = [
          '<div>',
            '<div id="myFirstSnap" snap-content snap-id="\'myFirstSnap\'">',
              'some stuff',
            '</div>',
            '<div id="mySecondSnap" snap-content snap-id="snapIdFromScope">',
              'more stuff',
            '</div>',
          '</div>'
        ].join('');

        spyOn(snapRemote, 'register').andCallThrough();

        element = angular.element(tpl);
        element = compile(element)(scope);
      }));

      it('should use the "snap-id" attribute to register snappers', inject(function(snapRemote) {
        expect(snapRemote.register.calls.length).toEqual(2);
        expect(snapRemote.register.calls[0].args[1]).toEqual('myFirstSnap');
        expect(snapRemote.register.calls[1].args[1]).toEqual('mySecondSnap');
      }));

      it('should allow us to get a specific snapper by id', function() {
        // ...
      });
    });

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

  describe('cleanup', function() {
    it('should remove stale snapper instances when scopes are $destoryed', inject(function(snapRemote) {
      var scope = rootScope.$new();
      spyOn(snapRemote, 'unregister');

      element = angular.element(tpl);
      element = compile(element)(scope);

      scope.$destroy();
      expect(snapRemote.unregister).toHaveBeenCalled();
    }));
  });


});
