'use strict';

describe('Component: nlsrDisplay', function () {

  // load the component's module
  beforeEach(module('nlsr-display'));

  var nlsrDisplayComponent, scope;

  // Initialize the component and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    nlsrDisplayComponent = $componentController('nlsrDisplay', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
