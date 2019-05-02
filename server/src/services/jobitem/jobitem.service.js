// Initializes the `jobitem` service on path `/jobitem`
const createService = require('feathers-objection');
const createModel = require('../../models/jobitem.model');
const hooks = require('./jobitem.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:'Id'
  };

  // Initialize our service with any options it requires
  app.use('/jobitem', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('jobitem');

  service.hooks(hooks);
};
