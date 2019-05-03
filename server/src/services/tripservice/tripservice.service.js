// Initializes the `tripservice` service on path `/tripservice`
const createService = require('./tripservice.class.js');
const hooks = require('./tripservice.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/tripservice', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('tripservice');

  service.hooks(hooks);
};
