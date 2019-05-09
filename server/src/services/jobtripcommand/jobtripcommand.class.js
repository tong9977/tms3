/* eslint-disable no-unused-vars */
const errors = require('@feathersjs/errors');

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
    let numberOfAddedRows = [];

    let jobIds = data.JobId; //Array [1,2,3]
    let tripId = data.TripId;

    const jobTrip = require('../../models/jobtrip.model')();
    const job = require('../../models/job.model')();
    const trip = require('../../models/trips.model')();
    try {

      let t = await trip.query().where('Id', tripId);  
      if (t.length == 0) {
        return Promise.reject(new errors.BadRequest('ไม่พบ trip นี้อยู่ในระบบ'));
      }

      if (jobIds.length > 0) {
        for(let i=0;i < jobIds.length; i++){
          let j = await job.query().where('Id', jobIds[i]).where('JobStatusId',1);
          if (j.length != 0 && t.length != 0) {
            //เช็คว่า job นี้ เลข trip นี้ได้ลงแล้วรึยัง
            let jt = await jobTrip.query().where('JobId', jobIds[i]).where('TripId', tripId);
            if (jt.length == 0) {
              await jobTrip.query().insert({ JobId: jobIds[i], TripId: tripId, TripDate: t[0].TripDate });
              await job.query().findById(jobIds[i]).patch({JobStatusId: 2})
              numberOfAddedRows.push(jobIds[i]);
            }
          }
        }
      }
    } catch (err) {
      return err;
    } 

    return numberOfAddedRows;
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
