/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    const p1 = {
      name : 'ราชา',
      lastname : 'มัญยานนท์'
    } 

    

    const c1 ={
      companyName : 'ice corpation',
      position: 'ผู้จัดการ'
    }

    let output = {
      person : p1,
      company: c1
    }
    output.info = {}

    let output2 ={
      ...p1,
      ...c1
    }
    return output['person']['name']
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
