const company = require('./company/company.service.js');
const jobtype = require('./jobtype/jobtype.service.js');
const report = require('./report/report.service.js');
const test = require('./test/test.service.js');
const aun = require('./aun/aun.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(company);
  app.configure(jobtype);
  app.configure(report);
  app.configure(test);
  app.configure(aun);
};
