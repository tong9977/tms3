/* eslint-disable no-unused-vars */
const dateFns = require('date-fns');
const collect = require('collect.js');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    // const collection = collect([1, 2, 3, 4, 5]);

    // const diff = collection.diff([1, 2, 3, 9]);
    // let result = diff.all();

    let x = [
      {
        product: 'Chair',
        manufacturer: 'IKEA',
      },
      {
        product: 'Desk',
        manufacturer: 'IKEA',
      },
      {
        product: 'Chair',
        manufacturer: 'Herman Miller',
      }
    ]

    const collection = collect(x).sortBy('product').all();


    return collection;
  }

  async get(id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
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

    if (vehicleIds == null) {
      let rawVehicleActive = await vehicle.query().where('Active', true).select('VehicleId');
      let rawVehicleActiveArray = [];
      rawVehicleActive.forEach(v => {
        rawVehicleActiveArray.push(v.VehicleId);
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
      await trip.query().insert({ TripCode: tripCodeNew, TripDate: new Date(), Complete: false, Approve: false, ApprovedBy: "", VehicleId: vehicleId });
    });

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
