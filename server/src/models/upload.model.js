// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class upload extends Model {

  static get tableName() {
    return 'Uploads';
  }
  static get idColumn() {
    return 'Id';
  }
  

  $beforeInsert() {
    this.CreatedDate =  new Date().toISOString();
  }

  $beforeUpdate() {
    //this.updatedAt = new Date().toISOString();
  }
}

module.exports = function (app) {
  

  return upload;
};
