// Initializes the `usertripservice` service on path `/usertripservice`
const createService = require('./usertripservice.class.js');
const hooks = require('./usertripservice.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/usertripservice', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('usertripservice');

  service.hooks(hooks);
};
