'use strict';
var createProjectController = require('./controllers/createProjectController');
var getProjectByIdController = require('./controllers/getProjectByIdController');
var getProjectsController = require('./controllers/getProjectsController');
var updateProjectsController = require('./controllers/updateProjectsController');

exports.registerRoutes = function (app) {
  app.post(global.config.app.api + '/projects', createProjectController);
  app.get(global.config.app.api + '/projects/:projectId', getProjectByIdController);
  app.get(global.config.app.api + '/projects', getProjectsController);
  app.put(global.config.app.api + '/projects/:projectId', updateProjectsController);
};