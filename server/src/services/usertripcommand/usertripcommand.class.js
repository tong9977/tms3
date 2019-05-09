/* eslint-disable no-unused-vars */
const errors = require('@feathersjs/errors');
const dateFns = require('date-fns');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    let userId = params.query.UserId;
    let start = params.query.Start;
    let end = params.query.End;

    let tripStart = dateFns.format(start, "YYYY-MM-DDT00:00:00");
    let tripEnd = dateFns.format(end, "YYYY-MM-DDT23:59:59");

    var output = [{
      data: [],
    }];

    const userTrip = require('../../models/usertrip.model')();
    const trip = require('../../models/trips.model')();

    let rawData = await userTrip.query().where('UserId', userId).where('TripDate', '>=', tripStart).where('TripDate', '<=', tripEnd);

    rawData.forEach(async t => {
      let tripIdNow = t.TripId;
      let tripData = await trip.query().where('Id', tripIdNow);

      var ct = {};
      ct['Id'] = tripData[0].Id;
      console.log(ct);
      await output[0].data.push(ct);
      console.log(output[0].data);
    });
    console.log('Final : ' + output[0].data);

    return output[0];
  }

  async get(id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
    let numberOfAddedRows = [];

    let userIds = data.UserId;
    let tripId = data.TripId;

    const userTrip = require('../../models/usertrip.model')();
    const user = require('../../models/user.model')();
    const trip = require('../../models/trips.model')();

    try {
      let t = await trip.query().where('Id', tripId);
      //ออก เพราะส่งมาเป็น Array
      //if(u.length == 0){
      //return Promise.reject(new errors.BadRequest('ไม่พบ user นี้อยู่ในระบบ'));
      //}

      if (t.length == 0) {
        return Promise.reject(new errors.BadRequest('ไม่พบ trip นี้อยู่ในระบบ'));
      }

      if (userIds.length > 0) {
        userIds.forEach(async userIdNow => {
          let u = await user.query().where('Id', userIdNow);
          if (u.length != 0 && t.length != 0) {
            //เช็คสวันที่ของ trip ในวันเดียวได้มีการออก trip ไปแล้วรึยัง
            console.log();
            let ut1 = await userTrip.query().where('UserId', userIdNow).where('TripDate',t[0].TripDate );
     
            if (ut1.length == 0) {
              //เช็คว่า user นี้ เลข trip นี้ได้ลงแล้วรึยัง
              let ut2 = await userTrip.query().where('UserId', userIdNow).where('TripId', tripId);
              if (ut2.length == 0) {
                await userTrip.query().insert({ UserId: userIdNow, TripId: tripId, TripDate: t[0].TripDate });
                numberOfAddedRows.push(userIdNow);
              }
            }
          }
        });
      }
    } catch (err) {
      return 0;
    }

    return numberOfAddedRows;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    let userId = params.query.UserId;
    let tripId = params.query.TripId;

    const userTrip = require('../../models/usertrip.model')();
    const numberOfDeletedRows = await userTrip.query().delete().where('UserId', userId).where('TripId', tripId);

    console.log('removed', numberOfDeletedRows, 'รายการ');

    return { numberOfDeletedRows };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
