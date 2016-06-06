'use strict';
var winston = require('winston');
var config = require('../config/config');

var logger = new winston.Logger({
    transports: [
        new winston.transports.File(config.logger.file),
        new winston.transports.Console(config.logger.console)
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};