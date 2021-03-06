'use strict';
var BaseController = require('../../commons/baseController');
var errorHandler = require('../../commons/errorHandler');
var schema = require('../schemas/createProjectSchema');
var createProjectService = require('../services/createProjectService');

function getData(body) {
  return {
    name: body.name,
    state: body.state,
    phase: body.phase,
    estimatedSavingsPotential: body.estimatedSavingsPotential,
    totalSavingsAchieved: body.totalSavingsAchieved,
    startDate: body.startDate,
    endDate: body.endDate,
    modality: body.modality
  }
}

function controller(req, res) {
  var data = getData(req.body);
  global.logger.debug(JSON.stringify(data));
  var controller = new BaseController({
    data: data,
    services: services,
    schema: schema
  });
  controller.execute(callback);

  function callback(err, result) {
    if (err) {
      global.logger.error('err: ' + err);
      global.logger.error('err: ' + JSON.stringify(err));
      let error = errorHandler(err);
      res.status(error.statusCode).send(error.message)
    } else {
      res.status(201).send({project: {_id: result}})
    }
  }
}

function services(data, callback) {
  createProjectService(data, function (err, projectId) {
    callback(err, projectId);
  });
}

module.exports = controller;