'use strict';
var BaseController = require('../../commons/baseController');
var errorHandler = require('../../commons/errorHandler');
var getProjectsService = require('../services/getProjectsService');

function getData(query) {
  return {
    fields: query.fields,
    sort: query.sort,
    order: query.order
  }
}

function controller(req, res) {
  var data = getData(req.query);
  global.logger.debug(JSON.stringify(data));
  var controller = new BaseController({
    data: data,
    services: services
  });
  controller.execute(callback);

  function callback(err, projects) {
    if (err) {
      global.logger.error('err: ' + err);
      global.logger.error('err: ' + JSON.stringify(err));
      let error = errorHandler(err);
      res.status(error.statusCode).send(error.message)
    } else {
      res.status(200).send({projects: projects})
    }
  }
}

function services(data, callback) {
  getProjectsService(data, function (err, projects) {
    callback(err, projects);
  });
}

module.exports = controller;