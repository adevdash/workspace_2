'use strict';

describe('Component: graph', function () {

  // load the component's module
  beforeEach(module('graph'));

  var graphComponent, scope;

  // Initialize the component and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    graphComponent = $componentController('graph', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
