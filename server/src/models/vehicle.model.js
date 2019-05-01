// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class vehicle extends Model {

  static get tableName() {
    return 'vehicles';
  }

  static get idColumn() {
    return 'VehicleId';
  }
  
  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
  static get relationMappings() {

    const vehicletype = require('./vehicletype.model')();
    return {
      vehicletype: {
        relation: Model.HasOneRelation,
        modelClass: vehicletype,
        join: {
          from: 'vehicles.VehicleTypeId',
          to: 'vehicletype.Id'
        }
      },
    }
  }
}

module.exports = function (app) {
  
  return vehicle;
};
