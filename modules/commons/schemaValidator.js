'use strict';
// Schema Documentation: http://json-schema.org/

var validator = require('is-my-json-valid');

function Validator(data, schema) {
  this.data = data;
  this.validate = validator(schema);
}

Validator.prototype.isValid = function () {
  return this.validate(this.data);
};

Validator.prototype.getErrors = function () {
  return this.validate.errors.map(error => {
    return {
      field: error.field.split('.')[1],
      message: error.message
    }
  });
};

module.exports = Validator;