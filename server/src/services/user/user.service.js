// Initializes the `user` service on path `/user`
const createService = require('feathers-objection');
const createModel = require('../../models/user.model');
const hooks = require('./user.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:'Id',
    whitelist: ['$eager', '$joinRelation'],
    allowedEager: '[role]'
  };

  // Initialize our service with any options it requires
  app.use('/user', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('user');

  service.hooks(hooks);
};
