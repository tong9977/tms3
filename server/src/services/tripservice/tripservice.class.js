/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    let date = params.query.date;
    let vehicleId = params.query.vehicleId;

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = yyyy + mm + dd;

    const trip = require('../../models/trips.model')();
    const vehicle = require('../../models/vehicle.model')();

    let rawTrip = await trip.query();
    let rawvehicle = await vehicle.query();

    if (vehicleId != null) {
      rawvehicle.forEach(async v => {
        if (rawTrip.length > 0) {
          rawTrip.forEach(async t => {
            let tripCode = today + '-' + v.VehicleId;
            if (t.TripCode, '!=', tripCode) {
              await trip.query().insert({ TripCode: tripCode, TripDate: new Date(), Complete: false, Approve: false, ApprovedBy: "", VehicleId: v.VehicleId });
            }
          });
        }else{
          await trip.query().insert({ TripCode: tripCode, TripDate: new Date(), Complete: false, Approve: false, ApprovedBy: "", VehicleId: v.VehicleId });
        }
      });
    }

    return rawTrip;
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
