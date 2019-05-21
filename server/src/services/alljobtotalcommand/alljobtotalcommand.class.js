/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (id) {
    var output = [{
      AllJob: [],
    }];
    const jobs = require('../../models/job.model')();
    //Job1 = JobNew
    //Job2 = JobAssign
    //Job3 = JobFinish
    //Job4 = JobComplete
   
    let job1 = await jobs.query().where('JobStatusId', 1);
    let job2 = await jobs.query().where('JobStatusId', 2);
    let job3 = await jobs.query().where('JobStatusId', 3);
    let job4 = await jobs.query().where('JobStatusId', 4);
    output[0].AllJob.push(job1.length,job2.length,job3.length,job4.length);
    
   
  

   

    return output;
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
