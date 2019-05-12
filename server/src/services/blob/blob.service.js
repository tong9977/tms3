// Initializes the `blob` service on path `/blob`
const createService = require('feathers-objection');
const createModel = require('../../models/blob.model');
const hooks = require('./blob.hooks');


const blobService  = require('feathers-blob');
const fs = require('fs-blob-store');
const blobStorage = fs('public/blobs');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    model: Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/blob', blobService({ Model: blobStorage}));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('blob');

  service.hooks(hooks);
};
