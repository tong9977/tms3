// Initializes the `jobtripcommand` service on path `/jobtripcommand`
const createService = require('./jobtripcommand.class.js');
const hooks = require('./jobtripcommand.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/jobtripcommand', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('jobtripcommand');

  service.hooks(hooks);
};
