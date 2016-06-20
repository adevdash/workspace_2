'use strict';

describe('Controller: RibControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('RibController'));

  var RibControllerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RibControllerCtrl = $controller('RibControllerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
