// Initializes the `vehicle` service on path `/vehicle`
const createService = require('feathers-objection');
const createModel = require('../../models/vehicle.model');
const hooks = require('./vehicle.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:'VehicleId',
    whitelist: ['$eager', '$joinRelation'],
    allowedEager: '[vehicletype]'
  };

  // Initialize our service with any options it requires
  app.use('/vehicle', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('vehicle');

  service.hooks(hooks);
};
