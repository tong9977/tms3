// Initializes the `usertripcommand` service on path `/usertripcommand`
const createService = require('./usertripcommand.class.js');
const hooks = require('./usertripcommand.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/usertripcommand', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('usertripcommand');

  service.hooks(hooks);
};
