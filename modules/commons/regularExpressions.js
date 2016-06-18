'use strict';

module.exports = {
  mongoId: '^[0-9a-fA-F]{24}$',
  email: '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$',
  url: '^(https?:\/\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\/\\w \\.-]*)*\/?$'
};