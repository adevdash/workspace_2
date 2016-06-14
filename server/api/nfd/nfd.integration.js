'use strict';

var app = require('../..');
import request from 'supertest';

var newNfd;

describe('Nfd API:', function() {

  describe('GET /api/nfds', function() {
    var nfds;

    beforeEach(function(done) {
      request(app)
        .get('/api/nfds')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          nfds = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(nfds).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/nfds', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/nfds')
        .send({
          name: 'New Nfd',
          info: 'This is the brand new nfd!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newNfd = res.body;
          done();
        });
    });

    it('should respond with the newly created nfd', function() {
      expect(newNfd.name).to.equal('New Nfd');
      expect(newNfd.info).to.equal('This is the brand new nfd!!!');
    });

  });

  describe('GET /api/nfds/:id', function() {
    var nfd;

    beforeEach(function(done) {
      request(app)
        .get('/api/nfds/' + newNfd._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          nfd = res.body;
          done();
        });
    });

    afterEach(function() {
      nfd = {};
    });

    it('should respond with the requested nfd', function() {
      expect(nfd.name).to.equal('New Nfd');
      expect(nfd.info).to.equal('This is the brand new nfd!!!');
    });

  });

  describe('PUT /api/nfds/:id', function() {
    var updatedNfd;

    beforeEach(function(done) {
      request(app)
        .put('/api/nfds/' + newNfd._id)
        .send({
          name: 'Updated Nfd',
          info: 'This is the updated nfd!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedNfd = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedNfd = {};
    });

    it('should respond with the updated nfd', function() {
      expect(updatedNfd.name).to.equal('Updated Nfd');
      expect(updatedNfd.info).to.equal('This is the updated nfd!!!');
    });

  });

  describe('DELETE /api/nfds/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/nfds/' + newNfd._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when nfd does not exist', function(done) {
      request(app)
        .delete('/api/nfds/' + newNfd._id)
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
