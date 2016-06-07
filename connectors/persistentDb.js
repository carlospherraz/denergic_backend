'use strict';
var async = require('async');
var Mongo = require('mongodb');
var connectionsPool = require('./connectionsPool');

function MongoConnector(dbConfig) {
  this.config = dbConfig;
  this.client = null;
}

MongoConnector.prototype = {
  init: function (callback) {
    var that = this;
    var url = 'mongodb://' + ((this.config.user) ? this.config.user + ':' + this.config.password : '') + '@' + this.config.host + ':' + this.config.port + '/' + this.config.database;
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
  find: function (collectionName, data, options, callback) {
    if (callback === undefined) {
      callback = options;
      options = {};
    }
    var collection = this.client.collection(collectionName);
    collection.find(data, options, function (err, result) {
      callback(err, result);
    });
  },
  /*paginate: function (collectionName, select, fields, pageNumber, pageSize, orderField, orderAsc, callback) {
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
          if (err) {
            callback(err)
          } else {
            callback(null, result);
          }
        });
      },
      function (callback) {
        that.count(collectionName, select, function (err, count) {
          if (err) {
            callback(err)
          } else {
            callback(null, count);
          }
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
  },*/
  insertOne: function (collectionName, data, callback) {
    var collection = this.client.collection(collectionName);
    collection.insertOne(data, function (err, result) {
      callback(err, result.ops);
    });
  },
  updateOne: function (collectionName, query, data, options, callback) {
    if (callback === undefined) {
      callback = options;
      options = {};
    }
    var collection = this.client.collection(collectionName);
    collection.updateOne(query, data, options, function (err, result) {
      callback(err, result.result.n);
    });
  },
  deleteOne: function (collectionName, query, callback) {
    var collection = this.client.collection(collectionName);
    collection.deleteOne(query, function (err, result) {
      callback(err, result.result.n);
    });
  },
  aggregate: function (collectionName, pipeline, options, callback) {
    if (callback === undefined) {
      callback = options;
      options = {};
    }
    var collection = this.client.collection(collectionName);
    collection.aggregate(pipeline, options, function (err, result) {
      callback(err, result);
    });
  }
};
module.exports = MongoConnector;