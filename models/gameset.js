const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    game: Number,
    live: Boolean,
    player1: {
      player: Object,
      score: Number
    },
    player2: {
      player: Object,
      score: Number
    }
  },
  {
    collection: "gameset"
  }
);

var gameset = new mongoose.model("Gameset", schema);

module.exports = gameset;
