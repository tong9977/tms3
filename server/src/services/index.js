const role = require('./role/role.service.js');
const user = require('./user/user.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(role);
  app.configure(user);
};
