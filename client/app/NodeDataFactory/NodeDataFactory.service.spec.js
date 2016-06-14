'use strict';

describe('Service: NodeDataFactory', function () {

  // load the service's module
  beforeEach(module('NodeDataFactory'));

  // instantiate service
  var NodeDataFactory;
  beforeEach(inject(function (_NodeDataFactory_) {
    NodeDataFactory = _NodeDataFactory_;
  }));

  it('should do something', function () {
    expect(!!NodeDataFactory).to.be.true;
  });

});
