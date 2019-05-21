/* eslint-disable no-unused-vars */
const errors = require('@feathersjs/errors');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    let jobId = params.query.JobId;

    var output = [{
      Trips: [],
    }];
    const jobTrip = require('../../models/jobtrip.model')();
    const trip = require('../../models/trips.model')();

    let rawData = await jobTrip.query().where('JobId', jobId);

    for (let i = 0; i < rawData.length; i++) {
      let tripIdNow = rawData[i].TripId;
      let tripData = await trip.query().eager("[jobs, vehicle, users, usertrips ]").where('Id', tripIdNow);

      output[0].Trips.push(tripData[0]);
    };

    return output;
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

      let t = await trip.query().where('Id', tripId);  
      if (t.length == 0) {
        return Promise.reject(new errors.BadRequest('ไม่พบ trip นี้อยู่ในระบบ'));
      }

      if (jobIds.length > 0) {
        for(let i= 0;i < jobIds.length; i++){
          let jobid = jobIds[i];
          let j = await job.query().where('Id', jobid).where('JobStatusId',1);
          if (j.length != 0 && t.length != 0) {
            //เช็คว่า job นี้ เลข trip นี้ได้ลงแล้วรึยัง
            let jt = await jobTrip.query().where('JobId', jobid).where('TripId', tripId);
            if (jt.length == 0) {
              await jobTrip.query().insert({ JobId: jobid, TripId: tripId, TripDate: t[0].TripDate });
              numberOfAddedRows.push(jobid);
              
              await job.query().findById(jobid).patch({JobDate: t[0].TripDate});

              if(j[0].TripCredit > 0){
                let tripTotal = j[0].TripCredit - 1;
                await job.query().findById(jobid).patch({TripCredit: tripTotal})
                if(tripTotal == 0){
                  await job.query().findById(jobid).patch({JobStatusId: 2})
                }   
              }
            }
          }
        }
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
    let jobId = id.JobId;
    let tripId = id.TripId;

    const jobTrip = require('../../models/jobtrip.model')();
    const numberOfDeletedRows = await jobTrip.query().delete().where('JobId', jobId).where('TripId', tripId);

    const job = require('../../models/job.model')();
    await job.query().findById(jobId).patch({JobStatusId: 1});

    let j = await job.query().where('Id', jobId);
    let tripTotal = j[0].TripCredit + 1;
    await job.query().findById(jobId).patch({TripCredit: tripTotal});

    console.log('removed', numberOfDeletedRows, 'รายการ');

    return { numberOfDeletedRows };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
