'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var nfdCtrlStub = {
  index: 'nfdCtrl.index',
  show: 'nfdCtrl.show',
  create: 'nfdCtrl.create',
  update: 'nfdCtrl.update',
  destroy: 'nfdCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var nfdIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './nfd.controller': nfdCtrlStub
});

describe('Nfd API Router:', function() {

  it('should return an express router instance', function() {
    expect(nfdIndex).to.equal(routerStub);
  });

  describe('GET /api/nfds', function() {

    it('should route to nfd.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'nfdCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/nfds/:id', function() {

    it('should route to nfd.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'nfdCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/nfds', function() {

    it('should route to nfd.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'nfdCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/nfds/:id', function() {

    it('should route to nfd.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'nfdCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/nfds/:id', function() {

    it('should route to nfd.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'nfdCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/nfds/:id', function() {

    it('should route to nfd.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'nfdCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
