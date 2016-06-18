'use strict';
var regularExpressions = require('../../commons/regularExpressions');
var schema = {
  type: 'object',
  properties: {
    _id: {type: 'string', pattern: regularExpressions.mongoId},
    name: {type: 'string'},
    state: {type: 'string', enum: ['active', 'rejected']},
    phase: {type: 'string', enum: ['preProject', 'project']},
    estimatedSavingsPotential: {type: 'number'},
    totalSavingsAchieved: {type: 'number'},
    startDate: {type: 'string'},
    endDate: {type: 'string'},
    modality: {type: 'string'}
  }
};

module.exports = schema;