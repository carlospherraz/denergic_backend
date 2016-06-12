/**
 * Module dependencies
 */
var bodyParser = require('body-parser');
var cluster = require('cluster');
var config = require('./config/config');
var express = require('express');
var logger = require('./logger/logger');
var methodOverride = require('method-override');
var morgan = require('morgan');
var routes = require('./routes/routes');
var path = require('path');
var cors = require('cors');
var persistentDBLoader = require('./loaders/persistentDb');

//Utils
var async = require('async');

var app = express();
var router = express.Router();

/**
 * Global variables
 */
global.config = config;
global.logger = logger;


function start() {
  logger.info('Starting Logging server, please wait...');
  logger.info('config: ' + JSON.stringify(config));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cors());
  app.use('/', router);
  app.use(methodOverride());
  app.use(morgan('dev', {'stream': logger.stream}));
  routes.register(app);
  app.listen(config.app.port, config.app.host, function () {
    async.series([persistentDBLoader.loader],
        function (err) {
          if (err) {
            logger.error('Something went wrong during boot time');
            process.exit(1);
          } else {
            logger.info('Server started at ports [ HTTP:' + config.app.port + ', HTTPS:' + config.app.ports + ' ]');
            started = true;
          }
        });
  });
  process.on('uncaughtException', function (err) {
    logger.error('Uncaught Exception' + err.stack, err);
  });
  return app;
}

function startInCluster() {
  if (!cluster.isMaster) {
    start();
  } else {
    var threads = require('os').cpus().length;
    while (threads--) cluster.fork();
    cluster.on('death', function (worker) {
      cluster.fork();
      logger.info('Process died and restarted, pid:', worker.pid);
    });
  }
}

function stop() {
  process.exit(0);
}

exports.start = start;
exports.startInCluster = startInCluster;
exports.stop = stop;
