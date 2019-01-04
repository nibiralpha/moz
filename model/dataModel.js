'use strict';

let dataModel = require('../database').models.data;

let findOneById = (query, projections, options, callback) => {
    dataModel.findOne(query, projections, options, callback);
}

let find = (query, projections, callback) => {
    dataModel.find(query, projections, callback);
}

let findWithOptions = (query, options, projections, callback) => {
    dataModel.find(query, options, projections, callback);
}

let insertMany = (query, callback) => {
    dataModel.insertMany(query, callback);
}

let create = (data, callback) => {
    let newData = new dataModel(data);
    newData.save(callback);
};

let update = (query, data, options, callback) => {
    dataModel.findOneAndUpdate(query, data, options, callback);
}

let updateOne = (query, data, callback) => {
    dataModel.updateOne(query, data, callback);
}

let isExistDocument = (query, fields, callback) => {
    dataModel.find(query, fields, callback);
}

let deleteConversation = (query, callback) => {
    dataModel.remove(query, callback);
}

let deleteMessage = (query, pull, callback) => {
    dataModel.findOneAndUpdate(query, pull, callback);
}

let aggregate = (query, callback) => {
    dataModel.aggregate(query, callback);
}

module.exports = {
    findOneById,
    find,
    findWithOptions,
    insertMany,
    create,
    update,
    updateOne,
    deleteConversation,
    deleteMessage,
    isExistDocument,
    aggregate
}