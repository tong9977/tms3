// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class ratequestion extends Model {

  static get tableName() {
    return 'RateQuestions';
  }
  static get idColumn() {
    return 'Id';
  }

  $beforeInsert() {
    //this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
   // this.updatedAt = new Date().toISOString();
  }
}

module.exports = function (app) {
 
  return ratequestion;
};
