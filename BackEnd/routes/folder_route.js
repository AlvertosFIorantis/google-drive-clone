const express = require("express");
const router = express.Router();
const createdFolder = require("../controlers/Folders/create_folder");
const getFolder = require("../controlers/Folders/get_folder");

router.post("/createFolder", createdFolder);

router.get("/", getFolder);

module.exports = router;
