/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return [];
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

  async patch (id,data,params) {
    
    
   let jobId = id; 
   
    
   const job = require('../../models/job.model')();
    let status = await job.query().findById(jobId);
    if( status.JobStatusId == 2){
      let newStatus = status.JobStatusId + 1;
      let newTime = new Date();
    await job.query().findById(jobId).patch({JobStatusId: newStatus,FinishedDate:newTime});
    
    }else if(status.JobStatusId == 3){
      let newStatus = status.JobStatusId + 1;
      let newTime = new Date();
    await job.query().findById(jobId).patch({JobStatusId: newStatus,CompletedDate:newTime});
    }
    
    //console.log(data)
    return status;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
