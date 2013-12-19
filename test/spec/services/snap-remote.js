/*global describe, beforeEach, module, jasmine, inject, angular, it, expect, spyOn */
/*jshint node:true */

'use strict';

describe('Service: snapRemote', function() {
  var snapRemote;

  beforeEach(module('snap'));

  beforeEach(inject(function(_snapRemote_, $rootScope) {
    snapRemote = _snapRemote_;
  }));

  describe('api', function() {
    it('should have a get method', function() {
      expect(snapRemote.getSnapper).toEqual(jasmine.any(Function));
    });

    it('should have a register method', function() {
      expect(snapRemote.register).toEqual(jasmine.any(Function));
    });

    it('should have an unregister method', function() {
      expect(snapRemote.unregister).toEqual(jasmine.any(Function));
    });

    it('should have a toggle method', function() {
      expect(snapRemote.toggle).toEqual(jasmine.any(Function));
    });

    it('should have an open method', function() {
      expect(snapRemote.open).toEqual(jasmine.any(Function));
    });

    it('should have a close method', function() {
      expect(snapRemote.close).toEqual(jasmine.any(Function));
    });

    it('should have a global options attribute', function() {
      expect(snapRemote.globalOptions).toBeDefined();
    });

    describe('getSnapper', function() {
      it('should return a promise', function() {
        expect(snapRemote.getSnapper().then).toEqual(jasmine.any(Function));
      });

      it('should resolve to the regisetered object', inject(function($rootScope) {
        var resolvedSnapper;

        snapRemote.getSnapper().then(function(snapper) {
          resolvedSnapper = snapper;
        });

        snapRemote.register({foo: 'bar'});
        $rootScope.$apply();

        expect(resolvedSnapper.foo).toBe('bar');
      }));
    });

    describe('unregister', function() {
      it('should undo a call to register', inject(function($rootScope) {
        var resolvedSnapper;

        snapRemote.register({shouldBe: 'dead'});
        $rootScope.$apply();

        snapRemote.unregister();
        $rootScope.$apply();

        snapRemote.getSnapper().then(function(snapper) {
          resolvedSnapper = snapper;
        });

        snapRemote.register({shouldBe: 'alive'});
        $rootScope.$apply();

        expect(resolvedSnapper.shouldBe).toBe('alive');
      }));
    });

    describe('close', function() {
      it('should delegate to the snapper instance close method', inject(function($rootScope) {
        var snapperMock = {
          close: angular.noop
        };

        spyOn(snapperMock, 'close');
        snapRemote.close();
        snapRemote.register(snapperMock);
        $rootScope.$apply();

        expect(snapperMock.close).toHaveBeenCalled();
      }));
    });

    describe('open', function() {
      it('should delegate to the snapper instance close method', inject(function($rootScope) {
        var snapperMock = {
          open: angular.noop
        };

        spyOn(snapperMock, 'open');
        snapRemote.open();
        snapRemote.register(snapperMock);
        $rootScope.$apply();

        expect(snapperMock.open).toHaveBeenCalled();
      }));
    });

    describe('toggle', function() {
      describe('other side', function() {
        it('should always open the snapper if a new side is toggled', inject(function($rootScope) {
          var snapperOpenSide
            , snapperMock = {
                open: angular.noop,
                state: function() {
                  return {state: snapperOpenSide};
                }
              };

          spyOn(snapperMock, 'open');
          snapRemote.register(snapperMock);

          snapperOpenSide = 'left';
          snapRemote.toggle('right');
          $rootScope.$apply();
          expect(snapperMock.open).toHaveBeenCalled();

          snapperOpenSide = 'right';
          snapRemote.toggle('left');
          $rootScope.$apply();
          expect(snapperMock.open.calls.length).toBe(2); // Called again
        }));
      });

      describe('same side', function() {
        it('should close the snapper if the same (open) side is toggle', inject(function($rootScope) {
          var snapperOpenSide
            , snapperMock = {
                close: angular.noop,
                state: function() {
                  return {state: snapperOpenSide};
                }
              };

          spyOn(snapperMock, 'close');
          snapRemote.register(snapperMock);

          snapperOpenSide = 'right';
          snapRemote.toggle('right');
          $rootScope.$apply();
          expect(snapperMock.close).toHaveBeenCalled();

          snapperOpenSide = 'left';
          snapRemote.toggle('left');
          $rootScope.$apply();
          expect(snapperMock.close.calls.length).toBe(2); // Called again
        }));
      });
    });
  });
});
