// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class jobtype extends Model {

  static get tableName() {
    return 'tbJobType';
  }
  static get idColumn() {
    return 'JobTypeID';
  }
 
  $beforeInsert() {
  }

  $beforeUpdate() {
  }
}

module.exports = function (app) {
  return jobtype;
};
