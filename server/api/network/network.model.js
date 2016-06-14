'use strict';

import mongoose from 'mongoose';

var NetworkSchema = new mongoose.Schema({
  name: String,
  info: String,

  nodes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Node'}]
});

export default mongoose.model('Network', NetworkSchema);
