// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class trips extends Model {

  static get tableName() {
    return 'Trips';
  }

  static get idColumn() {
    return 'Id';
  }

  $beforeInsert() {
    
  }

  $beforeUpdate() {
    
  }

  static get relationMappings() {
    const vehicle = require('./vehicle.model')();

    return {
      vehicle: {
        relation: Model.HasManyRelation,
        modelClass: vehicle,
        join: {
          from: 'Trips.VehicleId',
          to: 'Vehicles.VehicleId'
        }
      },
    }
  }
}

module.exports = function (app) {
  return trips;
};
