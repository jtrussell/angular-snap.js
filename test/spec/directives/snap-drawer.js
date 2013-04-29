'use strict';

describe('Directive: snapDrawer', function () {
  beforeEach(module('ngSnapApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<snap-drawer></snap-drawer>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the snapDrawer directive');
  }));
});
