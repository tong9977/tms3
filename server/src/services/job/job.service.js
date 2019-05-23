// Initializes the `job` service on path `/job`
const createService = require('feathers-objection');
const createModel = require('../../models/job.model');
const hooks = require('./job.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:'Id',
    whitelist: ['$eager', '$joinRelation'],
    allowedEager: '[jobstatus,jobtype,jobitem,uploads]'
  };

  // Initialize our service with any options it requires
  app.use('/job', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('job');

  service.hooks(hooks);
};
