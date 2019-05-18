// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class joblog extends Model {

  static get tableName() {
    return 'JobLog';
  }

  static get idColumn() {
    return 'Id';
  }

  $beforeInsert() {
   this.CreatedDate = new Date().toISOString();
  }

  $beforeUpdate() {
   // this.updatedAt = new Date().toISOString();
  }
  static get relationMappings() {

    const joblogtype = require('./joblogtype.model')();
    return {
      joblogtype: {
        relation: Model.HasOneRelation,
        modelClass: joblogtype,
        join: {
          from: 'JobLog.JobLogTypeId',
          to: 'JobLogTypes.Id'
        }
      },
    }
  }
}

module.exports = function (app) {
 
  return joblog;
};
