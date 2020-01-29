const express = require("express");
const router = express.Router();

const character = require("../controller/character");

// Add Character
router.route("/create").post(character.create);

// Add Characters in bulk (CSV)
router.route("/create/bulk").post(character.createBulk);

// Get All Players
router.route("/").get(character.get);

// Get single Character
router.route("/:id").get(character.getCharacter);

// Update Character
router.route("/update/:id").put(character.update);

// Delete Character
router.route("/delete/:id").delete(character.delete);

module.exports = router;
