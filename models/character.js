const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    image: {
      type: String
    },
    roster: {
      type: Number
    }
  },
  {
    collection: "characters"
  }
);

var character = new mongoose.model("Character", schema);

module.exports = character;
