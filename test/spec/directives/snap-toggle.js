/*global describe, beforeEach, module, jasmine, inject, angular, it, expect */
/*jshint node:true */

'use strict';

describe('Directive: snapToggle', function() {
  beforeEach(module('snap'));

  var tpl = [
      '<button snap-toggle>',
        'awesome content',
      '</button>'
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

  console.log('[todo] test toggle directive [/todo]');
});
