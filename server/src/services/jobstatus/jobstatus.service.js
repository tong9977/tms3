// Initializes the `jobstatus` service on path `/jobstatus`
const createService = require('feathers-objection');
const createModel = require('../../models/jobstatus.model');
const hooks = require('./jobstatus.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:'Id'
  };

  // Initialize our service with any options it requires
  app.use('/jobstatus', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('jobstatus');

  service.hooks(hooks);
};
