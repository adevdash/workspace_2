'use strict';

describe('Component: performance', function () {

  // load the component's module
  beforeEach(module('performance'));

  var performanceComponent, scope;

  // Initialize the component and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    performanceComponent = $componentController('performance', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
