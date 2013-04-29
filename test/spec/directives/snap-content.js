'use strict';

describe('Directive: snapContent', function () {
  beforeEach(module('ngSnapApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<snap-content></snap-content>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the snapContent directive');
  }));
});
