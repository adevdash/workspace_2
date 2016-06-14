'use strict';

import mongoose from 'mongoose';

var NfdSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Nfd', NfdSchema);
