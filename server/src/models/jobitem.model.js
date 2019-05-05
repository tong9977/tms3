// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class jobitem extends Model {

  static get tableName() {
    return 'JobItems';
  }

  static get idColumn() {
    return 'Id';
  }

  $beforeInsert() {
    
    if(this.Complete === true){
      this.CompletedDate = new Date().toISOString();
     }else{
      this.CompletedDate = null;
     }
  }

  $beforeUpdate() {
    
   if(this.Complete === true){
    this.CompletedDate = new Date().toISOString();
   }else{
    this.CompletedDate = null;
   }

  }
}

module.exports = function (app) {
  
  return jobitem;
};
