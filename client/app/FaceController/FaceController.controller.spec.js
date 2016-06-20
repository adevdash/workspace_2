'use strict';

describe('Controller: FaceControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('FaceController'));

  var FaceControllerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FaceControllerCtrl = $controller('FaceControllerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
