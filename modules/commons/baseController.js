'use strict';
var SchemaValidator = require('./schemaValidator');

function BaseController(params) {
  this.setParams(params || {});
}

BaseController.prototype = {
  setParams: setParams,
  execute: execute
};

function setParams(params) {
  this.data = params.data;
  this.schema = params.schema;
  this.services = params.services;
}

function execute(callback) {
  if (this.schema) {
    var validator = new SchemaValidator(this.data, this.schema);
    if (validator.isValid()) {
      this.services(this.data, callback);
    } else {
      var errors = validator.getErrors();
      global.logger.error(JSON.stringify(errors))
      callback(errors);
    }
  } else {
    this.services(this.data, callback);
  }
}

module.exports = BaseController;