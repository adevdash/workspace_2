/**
 * Network model events
 */

'use strict';

import {EventEmitter} from 'events';
import Network from './network.model';
var NetworkEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
NetworkEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Network.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    NetworkEvents.emit(event + ':' + doc._id, doc);
    NetworkEvents.emit(event, doc);
  }
}

export default NetworkEvents;
