// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class company extends Model {

  static get tableName() {
    return 'tbCompany';
  }
  static get idColumn() {
    return 'CompanyID';
  }

  $beforeInsert() {
  }

  $beforeUpdate() {
 
  }
}

module.exports = function (app) {

  return company;
};
