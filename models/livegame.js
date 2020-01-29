const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    game: String
  },
  {
    collection: "livegame"
  }
);

var livegame = new mongoose.model("LiveGame", schema);

module.exports = livegame;
