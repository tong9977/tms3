// Initializes the `company` service on path `/company`
const createService = require('feathers-objection');
const createModel = require('../../models/company.model');
const hooks = require('./company.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate,
    id:'CompanyID'
  };

  // Initialize our service with any options it requires
  app.use('/company', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('company');

  service.hooks(hooks);
};
