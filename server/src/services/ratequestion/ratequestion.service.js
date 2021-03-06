// Initializes the `ratequestion` service on path `/ratequestion`
const createService = require('feathers-objection');
const createModel = require('../../models/ratequestion.model');
const hooks = require('./ratequestion.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:'Id',
  };

  // Initialize our service with any options it requires
  app.use('/ratequestion', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('ratequestion');

  service.hooks(hooks);
};
