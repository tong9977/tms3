/* eslint-disable no-unused-vars */


const dateFns = require('date-fns');
const collect = require('collect.js');
class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(id) {

    var output = [{
      MonthJob: [],
    }];
    const jobs = require('../../models/job.model')();
    let date = new Date();
    let start = dateFns.format(date, "YYYY-MM-DD 00:00:00");
    let end = dateFns.format(date, "YYYY-MM-DD 23:59:59");

    let a = dateFns.startOfMonth(start)+1;
    let StratMont = dateFns.format(a, "YYYY-MM-DD 00:00:00");
    let b = dateFns.endOfMonth(end);
    let EndMonth = dateFns.format(b, "YYYY-MM-DD 00:00:00");

    //Job1 = JobNew
    //Job2 = JobAssign
    //Job3 = JobFinish
    //Job4 = JobComplete

    let job1 = await jobs.query().where('JobStatusId', 1).where('CreatedDate', '>=', StratMont).where('CreatedDate', '<=', EndMonth);
    let job2 = await jobs.query().where('JobStatusId', 2).where('JobDate', '>=', StratMont).where('JobDate', '<=', EndMonth);
    let job3 = await jobs.query().where('JobStatusId', 3).where('FinishedDate', '>=', StratMont).where('FinishedDate', '<=', EndMonth);
    let job4 = await jobs.query().where('JobStatusId', 4).where('CompletedDate', '>=', StratMont).where('CompletedDate', '<=', EndMonth);
    output[0].MonthJob.push(job1.length, job2.length, job3.length, job4.length,StratMont,EndMonth);

    return output;
  }

  async get(id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
