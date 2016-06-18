'use strict';
var ObjectID = require('mongodb').ObjectID;
var connectionsPool = require('../../../connectors/connectionsPool');
var dbConstants = require('../../commons/dbConstant');

function service(data, callback) {
  connectionsPool.get('persistentDb').update({
    collectionName: dbConstants.collections.denergicProjects,
    data: data,
    select: {_id: ObjectID(data._id)}
  }, function (err, result) {
    callback(err, result > 0)
  })
}

module.exports = service;
