/* eslint-disable no-unused-vars */
const dateFns = require('date-fns');
const collect = require('collect.js');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find(params) {
    const trip = require('../../models/trips.model')();
    let rawData = await trip.query().eager('vehicletype');
    return rawData;
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    let date = data.date;
    let vehicleIds = data.vehicleId; //[]

    let start = dateFns.format(date, "YYYY-MM-DDT00:00:00");
    let end = dateFns.format(date, "YYYY-MM-DDT23:59:59");

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

    let rawVehicleToday = await trip.query().where('TripDate', '>=', start).where('TripDate', '<=', end).select('VehicleId');
    let rawVehicleTodayArray = [];
    rawVehicleToday.forEach(v => {
      rawVehicleTodayArray.push(v.VehicleId);
    });
    let result = [];

    if (vehicleIds.length == 0) {
      let rawVehicleActive = await vehicle.query().where('Active', true).select('Id');
      let rawVehicleActiveArray = [];
      rawVehicleActive.forEach(v => {
        rawVehicleActiveArray.push(v.Id);
      });
      
      const collection = collect(rawVehicleActiveArray);
      const diff = collection.diff(rawVehicleTodayArray);
      result = diff.all();
    } else {
      const collection = collect(vehicleIds);

      const diff = collection.diff(rawVehicleTodayArray);
      result = diff.all();
    }

    result.forEach(async vehicleId => {
      let tripCodeNew = today + '-' + vehicleId;
      await trip.query().insert({ TripCode: tripCodeNew, TripDate: start, Complete: false, Approve: false, ApprovedBy: "", VehicleId: vehicleId });
    });

    return result;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    let tripId = params.query.TripId;

    const trips = require('../../models/trips.model')();
    const numberOfDeletedRows = await trips.query().delete().where('Id', tripId);

    console.log('removed', numberOfDeletedRows, 'รายการ');

    return { numberOfDeletedRows };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
