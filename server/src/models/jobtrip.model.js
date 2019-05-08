// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class jobtrip extends Model {

  static get tableName() {
    return 'JobTrip';
  }

  static get idColumn() {
    return 'JobId';
  }

  $beforeInsert() {
   
  }

  $beforeUpdate() {
    
  }
}

module.exports = function (app) {
  return jobtrip;
};
