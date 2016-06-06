'use strict';
var projects = require('../modules/projects/routes');

function register(app) {
  projects.registerRoutes(app);
}

module.exports.register = register;