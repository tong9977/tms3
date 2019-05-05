// Initializes the `unit` service on path `/unit`
const createService = require('feathers-objection');
const createModel = require('../../models/unit.model');
const hooks = require('./unit.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:'Id',
  };

  // Initialize our service with any options it requires
  app.use('/unit', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('unit');

  service.hooks(hooks);
};
