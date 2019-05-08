// Initializes the `upload` service on path `/upload`
const createService = require('feathers-objection');
const createModel = require('../../models/upload.model');
const hooks = require('./upload.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:'Id'
  };

  // Initialize our service with any options it requires
  app.use('/upload', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('upload');

  service.hooks(hooks);
};
