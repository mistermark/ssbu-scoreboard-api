const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    image: {
      type: String
    },
    type: {
      type: String
    },
    roster: {
      type: Number
    }
  },
  {
    collection: "stages"
  }
);

var stage = new mongoose.model("Stage", schema);

module.exports = stage;
