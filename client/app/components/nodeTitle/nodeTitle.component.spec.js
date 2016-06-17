'use strict';

describe('Component: nodeTitle', function () {

  // load the component's module
  beforeEach(module('nodeTitle'));

  var nodeTitleComponent, scope;

  // Initialize the component and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    nodeTitleComponent = $componentController('nodeTitle', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
