/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    const data = [
      { name: "Eve", lastname: "Naja", age: 24 },
      { name: "Adam", lastname: "Monyanon", age: 48 },
      { name: "Chris", lastname: "Mo", age: 18 },
      { name: "Danny", lastname: "Manie", age: 30 }
    ]
    console.table(data);
    const m = data.map(item => {
      var o = {
        ...item,
        fullname: item.name + ' ' + item.lastname
      };
      delete o.name;
      delete o.lastname;

      return o;
    });

    console.table(m);


    return m;
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
