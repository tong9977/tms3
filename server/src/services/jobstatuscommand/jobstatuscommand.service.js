// Initializes the `jobstatuscommand` service on path `/jobstatuscommand`
const createService = require('./jobstatuscommand.class.js');
const hooks = require('./jobstatuscommand.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/jobstatuscommand', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('jobstatuscommand');

  service.hooks(hooks);
};
