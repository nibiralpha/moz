'use strict';

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

var keywordSchema = new Schema({
    keyword: String,
    number: Number,
    vol: Number,
    c: Boolean
});

let keywordModel = mongoose.model('keyword', keywordSchema);
module.exports = keywordModel;
