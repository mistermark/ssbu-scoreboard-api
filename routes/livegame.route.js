const express = require("express");
const router = express.Router();

const livegame = require("../controller/livegame");

// Get all Gamesets
router.route("/:id").get(livegame.get);

// Create Gameset
router.route("/").post(livegame.create);

// Update Gameset
router.route("/:id").put(livegame.update);

// Delete Game-set
router.route("/:id").delete(livegame.delete);

module.exports = router;
