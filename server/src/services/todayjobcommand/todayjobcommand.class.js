/* eslint-disable no-unused-vars */
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
