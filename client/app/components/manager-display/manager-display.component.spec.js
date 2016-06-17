'use strict';

describe('Component: managerDisplay', function () {

  // load the component's module
  beforeEach(module('manager-display'));

  var managerDisplayComponent, scope;

  // Initialize the component and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    managerDisplayComponent = $componentController('managerDisplay', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
