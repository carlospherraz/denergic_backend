'use strict';
var createProjectController = require('./controllers/createProjectController');

exports.registerRoutes = function (app) {
  app.post(global.config.app.api + '/projects', createProjectController);
};