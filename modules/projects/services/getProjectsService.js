'use strict';
var connectionsPool = require('../../../connectors/connectionsPool');
var dbConstants = require('../../commons/dbConstant');

function service(data, callback) {
  connectionsPool.get('persistentDb').find({
    collectionName: dbConstants.collections.denergicProjects,
    fields: data.fields,
    sort: data.sort,
    order: data.order
  }, function (err, result) {
    callback(err, result)
  })
}

module.exports = service;
