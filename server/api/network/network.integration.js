'use strict';

var app = require('../..');
import request from 'supertest';

var newNetwork;

describe('Network API:', function() {

  describe('GET /api/networks', function() {
    var networks;

    beforeEach(function(done) {
      request(app)
        .get('/api/networks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          networks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(networks).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/networks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/networks')
        .send({
          name: 'New Network',
          info: 'This is the brand new network!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newNetwork = res.body;
          done();
        });
    });

    it('should respond with the newly created network', function() {
      expect(newNetwork.name).to.equal('New Network');
      expect(newNetwork.info).to.equal('This is the brand new network!!!');
    });

  });

  describe('GET /api/networks/:id', function() {
    var network;

    beforeEach(function(done) {
      request(app)
        .get('/api/networks/' + newNetwork._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          network = res.body;
          done();
        });
    });

    afterEach(function() {
      network = {};
    });

    it('should respond with the requested network', function() {
      expect(network.name).to.equal('New Network');
      expect(network.info).to.equal('This is the brand new network!!!');
    });

  });

  describe('PUT /api/networks/:id', function() {
    var updatedNetwork;

    beforeEach(function(done) {
      request(app)
        .put('/api/networks/' + newNetwork._id)
        .send({
          name: 'Updated Network',
          info: 'This is the updated network!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedNetwork = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedNetwork = {};
    });

    it('should respond with the updated network', function() {
      expect(updatedNetwork.name).to.equal('Updated Network');
      expect(updatedNetwork.info).to.equal('This is the updated network!!!');
    });

  });

  describe('DELETE /api/networks/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/networks/' + newNetwork._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when network does not exist', function(done) {
      request(app)
        .delete('/api/networks/' + newNetwork._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
