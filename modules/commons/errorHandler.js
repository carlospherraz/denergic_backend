'use strict';
var _ = require('lodash');

var ldapCodes = {
  68: {
    message: 'Entry Already Exists',
    statusCode: 409
  },
  19: {
    message: 'Password fails quality checking policy',
    statusCode: 409
  }
};

var errorCodes = {
  'email_already_exists': {
    message: 'Entry Already Exists',
    statusCode: 409
  },
  'password_is_not_the_same': {
    message: 'Password is not the same',
    statusCode: 409
  }
};

function errorHandler(err) {
  if (err.hasOwnProperty('code') && ldapCodes.hasOwnProperty(err.code)) {
    return ldapCodes[err.code]
  } else if (Array.isArray(err)) {
    return {
      message: err,
      statusCode: 400
    }
  } else if (_.isString(err) && errorCodes.hasOwnProperty(err)) {
    return errorCodes[err]
  } else {
    return {
      message: 'Error Server',
      statusCode: 500
    }
  }
}

module.exports = errorHandler;