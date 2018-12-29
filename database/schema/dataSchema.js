'use strict';

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

var dataSchema = new Schema({
    keyword: String,
    vol: Number,
    hasMore: Boolean,
    data: [
        {
            pa: Number,
            da: Number,
            count: Number,
            link: String
        }
    ]
});

let dataModel = mongoose.model('data', dataSchema);
module.exports = dataModel;
