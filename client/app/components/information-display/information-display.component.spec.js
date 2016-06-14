'use strict';

describe('Component: informationDisplay', function () {

  // load the component's module
  beforeEach(module('information-display'));

  var informationDisplayComponent, scope;

  // Initialize the component and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    informationDisplayComponent = $componentController('informationDisplay', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
