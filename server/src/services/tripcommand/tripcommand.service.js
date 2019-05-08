// Initializes the `tripcommand` service on path `/tripcommand`
const createService = require('./tripcommand.class.js');
const hooks = require('./tripcommand.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/tripcommand', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('tripcommand');

  service.hooks(hooks);
};
