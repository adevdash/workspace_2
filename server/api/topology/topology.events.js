/**
 * Topology model events
 */

'use strict';

import {EventEmitter} from 'events';
import Topology from './topology.model';
var TopologyEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TopologyEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Topology.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TopologyEvents.emit(event + ':' + doc._id, doc);
    TopologyEvents.emit(event, doc);
  }
}

export default TopologyEvents;
