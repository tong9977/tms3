// Initializes the `alljobtotalcommand` service on path `/alljobtotalcommand`
const createService = require('./alljobtotalcommand.class.js');
const hooks = require('./alljobtotalcommand.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/alljobtotalcommand', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('alljobtotalcommand');

  service.hooks(hooks);
};
