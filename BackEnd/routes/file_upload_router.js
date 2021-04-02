const express = require("express");
const router = express.Router();
const uploadFile = require("../controlers/File_upload/file_upload");
const getFiles = require("../controlers/File_upload/get_files");

router.post("/", uploadFile);

router.get("/folder");

router.post("/getfiles/", getFiles);
// to full route einai http://localhost:5000/upload/getfiles/

module.exports = router;
