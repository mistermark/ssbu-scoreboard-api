const express = require("express");
const router = express.Router();

const player = require("../controller/player");

// Add Player
router.route("/create").post(player.create);

// Get All Players
router.route("/").get(player.get);

// Get single Player
router.route("/:id").get(player.getPlayer);

// Update Player
router.route("/update/:id").put(player.update);

// Delete Player
router.route("/delete/:id").delete(player.delete);

module.exports = router;
