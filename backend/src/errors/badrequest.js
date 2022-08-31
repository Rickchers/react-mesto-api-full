const { BAD_REQUEST } = require('../../constants');

class Badrequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = Badrequest;
