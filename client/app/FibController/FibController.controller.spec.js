'use strict';

describe('Controller: FibControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('FibController'));

  var FibControllerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FibControllerCtrl = $controller('FibControllerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
