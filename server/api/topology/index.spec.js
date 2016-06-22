'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var topologyCtrlStub = {
  index: 'topologyCtrl.index',
  show: 'topologyCtrl.show',
  create: 'topologyCtrl.create',
  update: 'topologyCtrl.update',
  destroy: 'topologyCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var topologyIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './topology.controller': topologyCtrlStub
});

describe('Topology API Router:', function() {

  it('should return an express router instance', function() {
    expect(topologyIndex).to.equal(routerStub);
  });

  describe('GET /api/nodes/topology', function() {

    it('should route to topology.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'topologyCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/nodes/topology/:id', function() {

    it('should route to topology.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'topologyCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/nodes/topology', function() {

    it('should route to topology.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'topologyCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/nodes/topology/:id', function() {

    it('should route to topology.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'topologyCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/nodes/topology/:id', function() {

    it('should route to topology.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'topologyCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/nodes/topology/:id', function() {

    it('should route to topology.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'topologyCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
