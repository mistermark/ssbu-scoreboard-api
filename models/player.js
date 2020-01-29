const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    team: {
      type: String
    },
    character: {
      type: String
    }
  },
  {
    collection: "players"
  }
);

var player = new mongoose.model("Player", schema);

module.exports = player;
