'use strict';
var proyectSchema = require('./projectSchema');
var schema = {
  type: 'object',
  properties: {
    $ref: '#/definitions/project'
  },
  definitions: {
    project: proyectSchema
  },
  required: ['_id']
};

module.exports = schema;