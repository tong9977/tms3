// Initializes the `monthjobcommamd` service on path `/monthjobcommamd`
const createService = require('./monthjobcommand.class.js');
const hooks = require('./monthjobcommand.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/monthjobcommand', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('monthjobcommand');

  service.hooks(hooks);
};
