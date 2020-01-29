let config = require("../config/config");

module.exports = {
  db: `${config.dbProtocol}://${config.dbHost}:${config.dbPort}/${config.dbName}`
};
