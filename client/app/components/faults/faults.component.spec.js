'use strict';

describe('Component: faults', function () {

  // load the component's module
  beforeEach(module('faults'));

  var faultsComponent, scope;

  // Initialize the component and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    faultsComponent = $componentController('faults', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
