'use strict';
var path = require('path');

module.exports = {
  app: {
    api: '/api/1.0/',
    protocol: 'https://',
    host: '0.0.0.0',
    url: 'https://datacloud.datiobd.es/verification',
    port: 80
  },
  adminApp: {
    api: '/api/1.0/',
    host: '0.0.0.0',
    port: 3001
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
  ldap: {
    type: 'ldap',
    url: '10.0.2.64',
    port: 389,
    webManager: 'cn=webManager,ou=Administration,dc=dataCloud,dc=datiobd,dc=es',
    password: "I'mDamasTer.",
    baseDn: 'dc=dataCloud,dc=datiobd,dc=es'
  },
  email: {
    account: 'supportdatacloud@datiobd.com',
    password: 'datiobd16datiobd16'
  }
};