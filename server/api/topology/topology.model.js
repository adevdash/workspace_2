'use strict';

import mongoose from 'mongoose';

var TopologySchema = new mongoose.Schema({
  nodes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Node'}],
  links: [{
    source: String,
    target: String
  }]
});

export default mongoose.model('Topology', TopologySchema);
