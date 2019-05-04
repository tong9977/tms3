// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class usertrip extends Model {

  static get tableName() {
    return 'UserTrip';
  }

  static get idColumn() {
    return 'UserId';
  }

  $beforeInsert() {
    
  }

  $beforeUpdate() {
   
  }
}

module.exports = function (app) {
  return usertrip;
};
