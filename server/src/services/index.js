const role = require('./role/role.service.js');
const user = require('./user/user.service.js');
const vehicle = require('./vehicle/vehicle.service.js');
const vehicletype = require('./vehicletype/vehicletype.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(role);
  app.configure(user);
  app.configure(vehicle);
  app.configure(vehicletype);
};
