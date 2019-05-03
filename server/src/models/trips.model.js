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
}

module.exports = function (app) {
  return trips;
};
