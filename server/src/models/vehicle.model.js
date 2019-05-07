// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class vehicle extends Model {

  static get tableName() {
    return 'Vehicles';
  }

  static get idColumn() {
    return 'Id';
  }
  
  $beforeInsert() {
    //this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    //this.updatedAt = new Date().toISOString();
  }

  static get relationMappings() {

    const vehicletype = require('./vehicletype.model')();
    return {
      vehicletype: {
        relation: Model.HasOneRelation,
        modelClass: vehicletype,
        join: {
          from: 'Vehicles.VehicleTypeId',
          to: 'Vehicletype.Id'
        }
      },
    }
  }
}

module.exports = function (app) {
  
  return vehicle;
};
