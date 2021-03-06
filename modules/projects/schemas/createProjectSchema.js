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
  required: ['name', 'state', 'phase', 'estimatedSavingsPotential', 'totalSavingsAchieved', 'startDate', 'endDate', 'modality']
};

module.exports = schema;