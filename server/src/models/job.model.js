// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class job extends Model {

  static get tableName() {
    return 'Jobs';
  }
  static get idColumn() {
    return 'Id';
  }


  $beforeInsert() {
   this.CreatedDate = new Date().toISOString();
  }

  $beforeUpdate() {
    
   
  }
  static get relationMappings() {

    const jobtype = require('./jobtype.model')();
    const jobstatus = require('./jobstatus.model')();
    const jobitem = require('./jobitem.model')();
    const upload = require('./upload.model')();
    return {
      jobtype: {
        relation: Model.HasOneRelation,
        modelClass: jobtype,
        join: {
          from: 'Jobs.JobTypeId',
          to: 'JobType.Id'
        }
      },
      jobstatus: {
        relation: Model.HasOneRelation,
        modelClass: jobstatus,
        join: {
          from: 'Jobs.JobStatusId',
          to: 'JobStatus.Id'
        }
      },
      jobitem: {
        relation: Model.HasManyRelation,
        modelClass: jobitem,
        join: {
          from: 'Jobs.Id',
          to: 'JobItems.JobId'
        }
      },
      uploads: {
        relation: Model.HasManyRelation,
        modelClass: upload,
        join: {
          from: 'Jobs.Id',
          to: 'Uploads.JobId'
        }
      }
    }
  }
}

module.exports = function (app) {

  return job;
};
