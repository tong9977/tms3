// Initializes the `joblogtype` service on path `/joblogtype`
const createService = require('feathers-objection');
const createModel = require('../../models/joblogtype.model');
const hooks = require('./joblogtype.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:'Id'
  };

  // Initialize our service with any options it requires
  app.use('/joblogtype', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('joblogtype');

  service.hooks(hooks);
};
