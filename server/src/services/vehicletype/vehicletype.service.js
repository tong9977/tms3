// Initializes the `vehicletype` service on path `/vehicletype`
const createService = require('feathers-objection');
const createModel = require('../../models/vehicletype.model');
const hooks = require('./vehicletype.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:'Id',
  };

  // Initialize our service with any options it requires
  app.use('/vehicletype', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('vehicletype');

  service.hooks(hooks);
};
