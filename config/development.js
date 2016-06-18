'use strict';
var path = require('path');

module.exports = {
  app: {
    api: '/api/1.0',
    host: '0.0.0.0',
    port: 3000
  },
  token: {
    expiration: {
      number: '3',
      type: 'days'
    },
    secretKey: 'dfwe!2,nhy%ol'
  },
  logger: {
    file: {
      level: 'info',
      filename: path.join(__dirname, '..', '/logs/all-logs.log'),
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    }
  },
  databases: {
    persistentDb: {
      type: 'persistentDb',
      host: '192.168.1.132',
      port: 27017,
      database: 'denergic',
      user: '',
      password: ''
    }
  }
};