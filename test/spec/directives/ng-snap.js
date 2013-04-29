'use strict';

describe('Directive: ngSnap', function () {
  beforeEach(module('ngSnapApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<ng-snap></ng-snap>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the ngSnap directive');
  }));
});
