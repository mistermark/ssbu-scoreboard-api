const express = require("express");
const router = express.Router();

const upload = require("../controller/upload.controller");

// Upload
router.route("/").post(upload.upload);

module.exports = router;
