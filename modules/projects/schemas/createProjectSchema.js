'use strict';
var schema = {
  type: 'object',
  properties: {
    name: {type: 'string'},
    state: {type: 'string', enum: ['active', 'rejected']},
    phase: {type: 'string', enum: ['preProject', 'project']},
    estimatedSavingsPotential: {type: 'number'},
    totalSavingsAchieved: {type: 'number'},
    startDate: {type: 'string'},
    endDate: {type: 'string'},
    modality: {type: 'string'}
  },
  required: ['name', 'state', 'phase', 'estimatedSavingsPotential', 'totalSavingsAchieved', 'startDate', 'endDate', 'modality']
};

module.exports = schema;