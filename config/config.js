let configDev = require("./config.dev");
let configProd = require("./config.prod");

if (process.env.NODE_ENV === "production") {
  module.exports = configProd;
} else {
  module.exports = configDev;
}
