'use strict';

var app = require('../..');
import request from 'supertest';

var newTopology;

describe('Topology API:', function() {

  describe('GET /api/nodes/topology', function() {
    var topologys;

    beforeEach(function(done) {
      request(app)
        .get('/api/nodes/topology')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          topologys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(topologys).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/nodes/topology', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/nodes/topology')
        .send({
          name: 'New Topology',
          info: 'This is the brand new topology!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTopology = res.body;
          done();
        });
    });

    it('should respond with the newly created topology', function() {
      expect(newTopology.name).to.equal('New Topology');
      expect(newTopology.info).to.equal('This is the brand new topology!!!');
    });

  });

  describe('GET /api/nodes/topology/:id', function() {
    var topology;

    beforeEach(function(done) {
      request(app)
        .get('/api/nodes/topology/' + newTopology._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          topology = res.body;
          done();
        });
    });

    afterEach(function() {
      topology = {};
    });

    it('should respond with the requested topology', function() {
      expect(topology.name).to.equal('New Topology');
      expect(topology.info).to.equal('This is the brand new topology!!!');
    });

  });

  describe('PUT /api/nodes/topology/:id', function() {
    var updatedTopology;

    beforeEach(function(done) {
      request(app)
        .put('/api/nodes/topology/' + newTopology._id)
        .send({
          name: 'Updated Topology',
          info: 'This is the updated topology!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTopology = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTopology = {};
    });

    it('should respond with the updated topology', function() {
      expect(updatedTopology.name).to.equal('Updated Topology');
      expect(updatedTopology.info).to.equal('This is the updated topology!!!');
    });

  });

  describe('DELETE /api/nodes/topology/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/nodes/topology/' + newTopology._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when topology does not exist', function(done) {
      request(app)
        .delete('/api/nodes/topology/' + newTopology._id)
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
