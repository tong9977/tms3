const role = require('./role/role.service.js');
const user = require('./user/user.service.js');
const vehicle = require('./vehicle/vehicle.service.js');
const vehicletype = require('./vehicletype/vehicletype.service.js');
const job = require('./job/job.service.js');
const jobtype = require('./jobtype/jobtype.service.js');
const jobstatus = require('./jobstatus/jobstatus.service.js');
const jobitem = require('./jobitem/jobitem.service.js');
const trips = require('./trips/trips.service.js');
const tripservice = require('./tripservice/tripservice.service.js');
const unit = require('./unit/unit.service.js');
const product = require('./product/product.service.js');
const usertrip = require('./usertrip/usertrip.service.js');
const usertripservice = require('./usertripservice/usertripservice.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(role);
  app.configure(user);
  app.configure(vehicle);
  app.configure(vehicletype);
  app.configure(job);
  app.configure(jobtype);
  app.configure(jobstatus);
  app.configure(jobitem);
  app.configure(trips);
  app.configure(tripservice);
  app.configure(unit);
  app.configure(product);
};
