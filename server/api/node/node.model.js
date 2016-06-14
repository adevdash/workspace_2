'use strict';

import mongoose from 'mongoose';

var NodeSchema = new mongoose.Schema({
  name: String,
  info: String,

  nfd: {

  },
  nlsr: {

  },

  faces: [{type: mongoose.Schema.Types.ObjectId, ref: 'Node'}],
  active: Boolean
});

export default mongoose.model('Node', NodeSchema);
