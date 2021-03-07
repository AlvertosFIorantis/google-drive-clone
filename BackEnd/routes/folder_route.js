const express = require("express");
const router = express.Router();
const createdFolder = require("../controlers/Folders/create_folder");

router.post("/createFolder", createdFolder);

module.exports = router;
