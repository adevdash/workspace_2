/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/nodes/topology              ->  index
 * POST    /api/nodes/topology              ->  create
 * GET     /api/nodes/topology/:id          ->  show
 * PUT     /api/nodes/topology/:id          ->  update
 * DELETE  /api/nodes/topology/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Topology from './topology.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Topologys
export function index(req, res) {
  return Topology.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Topology from the DB
export function show(req, res) {
  return Topology.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Topology in the DB
export function create(req, res) {
  return Topology.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Topology in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Topology.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Topology from the DB
export function destroy(req, res) {
  return Topology.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
