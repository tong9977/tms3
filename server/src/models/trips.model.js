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
    const user = require('./user.model')();
    const job = require('./job.model')();

    return {
      vehicle: {
        relation: Model.HasOneRelation,
        modelClass: vehicle,
        join: {
          from: 'Trips.VehicleId',
          to: 'Vehicles.Id'
        }
      },

      users: {
        relation: Model.ManyToManyRelation,
        modelClass: user,
        join: {
          from: 'Trips.Id',
          through: {
            // persons_movies is the join table.
            from: 'UserTrip.TripId',
            to: 'UserTrip.UserId'
          },
          to: 'Users.Id'
        }
      },

      jobs: {
        relation: Model.ManyToManyRelation,
        modelClass: job,
        join: {
          from: 'Trips.Id',
          through: {
            // persons_movies is the join table.
            from: 'JobTrip.TripId',
            to: 'JobTrip.JobId'
          },
          to: 'Jobs.Id'
        }
      },
    }
  }
}

module.exports = function (app) {
  return trips;
};
