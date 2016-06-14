'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var networkCtrlStub = {
  index: 'networkCtrl.index',
  show: 'networkCtrl.show',
  create: 'networkCtrl.create',
  update: 'networkCtrl.update',
  destroy: 'networkCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var networkIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './network.controller': networkCtrlStub
});

describe('Network API Router:', function() {

  it('should return an express router instance', function() {
    expect(networkIndex).to.equal(routerStub);
  });

  describe('GET /api/networks', function() {

    it('should route to network.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'networkCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/networks/:id', function() {

    it('should route to network.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'networkCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/networks', function() {

    it('should route to network.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'networkCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/networks/:id', function() {

    it('should route to network.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'networkCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/networks/:id', function() {

    it('should route to network.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'networkCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/networks/:id', function() {

    it('should route to network.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'networkCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
