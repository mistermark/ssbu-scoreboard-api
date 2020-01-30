const mongoose = require("mongoose");

const {
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
  MONGO_USERNAME,
  MONGO_PASSWORD
} = process.env;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000
};

mongoose.connect(url, options).then(
  () => {
    console.log("Database sucessfully connected");
  },
  error => {
    console.log("Database could not connected: " + error);
  }
);
