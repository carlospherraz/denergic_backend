'use strict';
var _ = require('lodash');
var async = require('async');
var Mongo = require('mongodb');
var connectionsPool = require('./connectionsPool');

function MongoConnector(dbConfig) {
  this.config = dbConfig;
  this.client = null;
}

MongoConnector.prototype = {
  _getFields: function (fields) {
    let result = {};
    if (fields) {
      fields.split(',').forEach(field => result[field] = 1);
    }
    return result;
  },
  _cleanUpdateData: function (data) {
    delete data._id;
    return _.omitBy(data, _.isNil);
  },
  _getSortAndOrderField: function (data) {
    if (data.hasOwnProperty('sort') && data.hasOwnProperty('order')) {
      var result = {};
      result[data.sort] = data.order === 'asc'? 1 : -1;
      return result
    } else {
      return {}
    }
  },
  init: function (callback) {
    let that = this;
    let url = 'mongodb://' + ((this.config.user) ? this.config.user + ':' + this.config.password : '') + '@' + this.config.host + ':' + this.config.port + '/' + this.config.database;
    Mongo.connect(url, function (err, db) {
      if (err) {
        callback(err)
      } else {
        that.client = db;
        connectionsPool.set(that.config.type, that);
        callback(null);
      }
      db.on('close', function () {
        that.log.error('Close event received at:' + JSON.stringify(config));
        connectionsPool.remove(url);
        return that.init(callback);
      });
    });
  },
  find: function (params, callback) {
    let collection = this.client.collection(params.collectionName);
    global.logger.debug(JSON.stringify(this._getSortAndOrderField(params)));
    collection
        .find(params.select)
        .project(this._getFields(params.fields))
        .sort(this._getSortAndOrderField(params))
        .toArray(function (err, result) {
      callback(err, result);
    });
  },
  insert: function (params, callback) {
    let collection = this.client.collection(params.collectionName);
    if (params.data.length) {
      collection.insertMany(params.data, function (err, result) {
        callback(err, result.ops);
      });
    } else {
      collection.insertOne(params.data, function (err, result) {
        callback(err, result.ops && result.ops.length? result.ops[0] : null);
      });
    }
  },
  update: function (params, callback) {
    let collection = this.client.collection(params.collectionName);
    collection.updateOne(params.select, {$set: this._cleanUpdateData(params.data)}, params.options, function (err, updated) {
      callback(err, updated? updated.result.n : null);
    });
  },
  paginatedFind: function (collectionName, select, fields, pageNumber, pageSize, orderField, orderAsc, callback) {
    var that = this;
    var from = pageNumber * pageSize;
    var until = from + pageSize;
    fields['normalized'] = {$toLower: '$' + orderField};
    var pipeline = [
      {$match: select},
      {$project: fields},
      {$sort: {normalized: orderAsc}},
      {$limit: until},
      {$skip: from}
    ];
    var collection = this.client.collection(collectionName);
    async.parallel([
      function (callback) {
        collection.aggregate(pipeline, function (err, result) {
          callback(err, result)
        });
      },
      function (callback) {
        that.countRecords(collectionName, select, function (err, count) {
          callback(err, count)
        })
      }
    ], function (err, results) {
      if (err) {
        callback(err)
      } else {
        var response = {data: results[0], count: results[1]};
        callback(err, response);
      }
    });
  },
  deleteOne: function (collectionName, query, callback) {
    let collection = this.client.collection(collectionName);
    collection.deleteOne(query, function (err, result) {
      callback(err, result.result.n);
    });
  },
  aggregate: function (collectionName, pipeline, options, callback) {
    if (callback === undefined) {
      callback = options;
      options = {};
    }
    let collection = this.client.collection(collectionName);
    collection.aggregate(pipeline, options, function (err, result) {
      callback(err, result);
    });
  },
  countRecords: function (collectionName, data, callback) {
    let collection = this.client.collection(collectionName);
    collection.find(data).count(function(err, count) {
      callback(err, count)
    })
  }
};
module.exports = MongoConnector;