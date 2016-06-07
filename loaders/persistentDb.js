'use strict';
var mongoConnector = require('../connectors/persistentDb');
var config = require('../config/config');
function mongodbLoader(callback) {
    var mC = new mongoConnector(global.config.databases.persistentDb);
    mC.init(function (err) {
        if (err)
            callback(err);
        else {
            logger.info('Connected to Mongo Database: ' + JSON.stringify(config.databases.persistentDb));
            callback();
        }

    });
}
module.exports.loader = mongodbLoader;