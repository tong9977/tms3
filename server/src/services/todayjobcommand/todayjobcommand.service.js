// Initializes the `todayjobcommand` service on path `/todayjobcommand`
const createService = require('./todayjobcommand.class.js');
const hooks = require('./todayjobcommand.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/todayjobcommand', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('todayjobcommand');

  service.hooks(hooks);
};
