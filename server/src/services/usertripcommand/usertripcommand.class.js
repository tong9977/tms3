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
      Trips: [],
    }];
    const userTrip = require('../../models/usertrip.model')();
    const trip = require('../../models/trips.model')();

    let rawData = await userTrip.query().where('UserId', userId).where('TripDate', '>=', tripStart).where('TripDate', '<=', tripEnd);

    for (let i = 0; i < rawData.length; i++) {
      let tripIdNow = rawData[i].TripId;
      let tripData = await trip.query().eager("[vehicle,users, jobs]").where('Id', tripIdNow);

      output[0].Trips.push(tripData[0]);
    };

    return output;
  }

  async get(id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
    let numberOfAddedRows = [];

    let userIds = data.UserId; //Array [1,2,3]
    let tripId = data.TripId;

    const userTrip = require('../../models/usertrip.model')();
    const user = require('../../models/user.model')();
    const trip = require('../../models/trips.model')();

    try {
      let t = await trip.query().where('Id', tripId);
      if (t.length == 0) {
        return Promise.reject(new errors.BadRequest('ไม่พบ trip นี้อยู่ในระบบ'));
      }

      if (userIds.length > 0) {
        for (let i = 0; i < userIds.length; i++) {
          let u = await user.query().where('Id', userIds[i]);
          if (u.length != 0 && t.length != 0) {
            //เช็ควันที่ของ trip ที่ส่งมาว่าในวันเดียวกัน user นี้ได้มีการออก trip อื่นไปแล้วรึยัง
            let ut1 = await userTrip.query().where('UserId',  userIds[i]).where('TripDate', t[0].TripDate);
            if (ut1.length == 0) {
              //เช็คว่า user นี้ เลข trip นี้ได้ลงแล้วรึยัง
              let ut2 = await userTrip.query().where('UserId',  userIds[i]).where('TripId', tripId);
              if (ut2.length == 0) {
                await userTrip.query().insert({ UserId:  userIds[i], TripId: tripId, TripDate: t[0].TripDate });
                numberOfAddedRows.push(userIds[i]);
              }
            }
          }
        }
      }
    } catch (err) {
      return err;
    }

    return numberOfAddedRows;
  }

  async update(id, data, params) {

    return data;
  }

  async patch(id, data, params) {
    //get login
    console.log(params);

    let userId = id.UserId;
    let tripId = id.TripId;
    let leader = data.Leader;
    
    console.log(userId);
    console.log(tripId);
    console.log(leader);

    const userTrip = require('../../models/usertrip.model')();
    const numberOfEditedRows = await userTrip.query().where('UserId', userId).where('TripId', tripId).patch({ Leader : leader});

    console.log('edited', numberOfEditedRows, 'รายการ');

    return { numberOfEditedRows };
  }

  async remove(id, params) {
    let userId = id.UserId;
    let tripId = id.TripId;

    console.log(userId);
    console.log(tripId);

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
