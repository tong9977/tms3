// Initializes the `blob` service on path `/blob`
const hooks = require('./blob.hooks');


const blobService  = require('feathers-blob');
const fs = require('fs-blob-store');
const blobStorage = fs('public/uploads');

module.exports = function (app) {

  // Initialize our service with any options it requires
  app.use('/blob', blobService({ Model: blobStorage}));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('blob');

  service.hooks(hooks);
};
