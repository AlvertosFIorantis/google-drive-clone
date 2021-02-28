const express = require("express");
const router = express.Router();
const uploadFile = require("../controlers/File_upload/file_upload");

router.post("/", uploadFile);

module.exports = router;
