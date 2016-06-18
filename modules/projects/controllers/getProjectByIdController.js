'use strict';
var BaseController = require('../../commons/baseController');
var errorHandler = require('../../commons/errorHandler');
var schema = require('../schemas/projectSchema');
var getProjectByIdService = require('../services/getProjectByIdService');

function getData(params, query) {
  return {
    _id: params.projectId,
    fields: query.fields
  }
}

function controller(req, res) {
  var data = getData(req.params, req.query);
  global.logger.debug(JSON.stringify(data));
  var controller = new BaseController({
    data: data,
    schema: schema,
    services: services
  });
  controller.execute(callback);

  function callback(err, project) {
    if (err) {
      global.logger.error('err: ' + err);
      global.logger.error('err: ' + JSON.stringify(err));
      let error = errorHandler(err);
      res.status(error.statusCode).send(error.message)
    } else {
      res.status(200).send({project: project})
    }
  }
}

function services(data, callback) {
  getProjectByIdService(data, function (err, project) {
    callback(err, project);
  });
}

module.exports = controller;