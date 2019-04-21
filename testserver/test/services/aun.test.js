const assert = require('assert');
const app = require('../../src/app');

describe('\'aun\' service', () => {
  it('registered the service', () => {
    const service = app.service('aun');

    assert.ok(service, 'Registered the service');
  });
});
