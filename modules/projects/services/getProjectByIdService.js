'use strict';
var ObjectID = require('mongodb').ObjectID;
var connectionsPool = require('../../../connectors/connectionsPool');
var dbConstants = require('../../commons/dbConstant');

function service(data, callback) {
  connectionsPool.get('persistentDb').find({
    collectionName: dbConstants.collections.denergicProjects,
    select: {_id: ObjectID(data._id)},
    fields: data.fields
  }, function (err, result) {
    callback(err, result.length? result[0] : null)
  })
}

module.exports = service;