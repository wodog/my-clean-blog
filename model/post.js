'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postgSchema = new Schema({
  title: {type: String},
  content: {type: String},
  author: {type: String},
  createDate: {type: Date, default: Date.now},
  updateDate: {type: Date, default: Date.now}
});


postgSchema.statics = {
  list: function(opts, cb){
    const creteria = opts.creteria || {};
    const select = opts.select || '';
    const page = opts.page || 1;
    const limit = opts.limit || 5;

    this.find(creteria).select(select).sort({createDate: -1}).limit(limit).skip((page-1)*limit).exec(cb);
  }
};

postgSchema.index({createDate: -1});

mongoose.model('Post', postgSchema);
