'use strict';

let keywordModel = require('../database').models.keyword;

let findOneById = (query, projections, options, callback) => {
    keywordModel.findOne(query, projections, options, callback);
}

let find = (query, projections, callback) => {
    keywordModel.find(query, projections, callback);
}

let insertMany = (query, callback) => {
    keywordModel.insertMany(query, callback);
}

let create = (data, callback) => {
    let newData = new keywordModel(data);
    newData.save(callback);
};

let update = (query, data, options, callback) => {
    keywordModel.findOneAndUpdate(query, data, options, callback);
}

let updateOne = (query, data, callback) => {
    keywordModel.updateOne(query, data, callback);
}

let isExistDocument = (query, fields, callback) => {
    keywordModel.find(query, fields, callback);
}

let deleteConversation = (query, callback) => {
    keywordModel.remove(query, callback);
}

let deleteMessage = (query, pull, callback) => {
    keywordModel.findOneAndUpdate(query, pull, callback);
}

let aggregate = (query, callback) => {
    keywordModel.aggregate(query, callback);
}

module.exports = {
    findOneById,
    find,
    insertMany,
    create,
    update,
    updateOne,
    deleteConversation,
    deleteMessage,
    isExistDocument,
    aggregate
}