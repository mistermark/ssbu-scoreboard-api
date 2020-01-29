const express = require("express");
const router = express.Router();

const gameset = require("../controller/gameset");

// Get all Gamesets
router.route("/").get(gameset.getAll);

// Create Gameset
router.route("/create").post(gameset.create);

// Update Gameset
router.route("/update/:id").put(gameset.update);

// Delete Game-set
router.route("/delete/:id").delete(gameset.delete);

module.exports = router;
