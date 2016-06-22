'use strict';

describe('Service: GraphingService', function () {

  // load the service's module
  beforeEach(module('GraphingService'));

  // instantiate service
  var GraphingService;
  beforeEach(inject(function (_GraphingService_) {
    GraphingService = _GraphingService_;
  }));

  it('should do something', function () {
    expect(!!GraphingService).to.be.true;
  });

});
