const express = require("express");
const router = express.Router();

const stage = require("../controller/stage");

// Add Stage
router.route("/create").post(stage.create);

// Get All Stages
router.route("/").get(stage.get);

// Get single Stage
// router.route("/:id").get(stage.getStage);

// Update Stage
// router.route("/update/:id").put(stage.update);

// Delete Stage
router.route("/delete/:id").delete(stage.delete);

module.exports = router;
