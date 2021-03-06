'use strict';
var connectionsPool = require('../../../connectors/connectionsPool');
var dbConstants = require('../../commons/dbConstant');

function service(data, callback) {
  connectionsPool.get('persistentDb').insert({
    collectionName: dbConstants.collections.denergicProjects,
    data: data
  }, function (err, result) {
    callback(err, result? result._id : null)
  })
}

module.exports = service;
