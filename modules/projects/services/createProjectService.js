'use strict';
var connectionsPool = require('../../../connectors/connectionsPool');
var dbConstants = require('../../commons/dbConstant');

function service(data, callback) {
  connectionsPool.get('persistentDb').insert(dbConstants.collections.denergicProjects, data, function (err, result) {
    callback(err, result)
  })
}

module.exports = service;
