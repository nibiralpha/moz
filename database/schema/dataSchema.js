'use strict';

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

// var dataSchema = new Schema({
//     pa: Number,
//     da: Number,
//     keyword: String,
//     count: Number,
//     vol: Number
// });

var dataSchema = new Schema({
    keyword: String,
    vol: Number,
    data: [
        {
            pa: Number,
            da: Number,
            count: Number
        }
    ]
});

let dataModel = mongoose.model('data', dataSchema);
module.exports = dataModel;
