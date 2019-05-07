/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    return [];
  }

  async get(id, params) {
    // return {
    //   id, text: `A new message with ID: ${id}!`
    // };
  }

  async create(data, params) {
    let result = 'false'; 

    let userId = data.UserId;
    let tripId = data.TripId;

    const userTrip = require('../../models/usertrip.model')();
    const user = require('../../models/user.model')();
    const trip = require('../../models/trips.model')();

    try {
      let u = await user.query().where('Id', userId);
      let t = await trip.query().where('Id', tripId);
      let ut = await userTrip.query().where('UserId', userId).where('TripId',tripId);

      if (u.length != 0 && t.length != 0) {
        console.log(ut.length);
        if(ut.length == 0){
          await userTrip.query().insert({ UserId: userId, TripId: tripId, TripDate: t[0].TripDate });
          result = 'true';
        } 
      }
    } catch (err) {
      return 0;
    }

    return result;
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
