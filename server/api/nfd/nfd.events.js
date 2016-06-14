/**
 * Nfd model events
 */

'use strict';

import {EventEmitter} from 'events';
import Nfd from './nfd.model';
var NfdEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
NfdEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Nfd.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    NfdEvents.emit(event + ':' + doc._id, doc);
    NfdEvents.emit(event, doc);
  }
}

export default NfdEvents;
