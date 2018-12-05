'use strict';

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/mozDB");
mongoose.set('debug', false);
var db = mongoose.connection;
mongoose.connection.on('error', function (err) {
    if (err) throw err;
});
mongoose.Promise = global.Promise;

module.exports = {
    mongoose, models: {
        data: require('./schema/dataSchema'),
        keyword: require('./schema/keywordSchema')
    }
}
