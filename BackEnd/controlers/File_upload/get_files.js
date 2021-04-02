const HttpError = require("../../error/http-error");
const Folder = require("../../models/folder");
const File = require("../../models/file");

const getFiles = async (req, res, next) => {
  const ParentId = req.body.ParentId;
  console.log("ParentId", req.body);
  let files;
  if (ParentId == undefined) {
    try {
      files = await File.find({ ParentId: { $exists: false } });
    } catch (err) {
      const error = new HttpError("Can not get the folder", 500);
      return next(error);
    }

    res.status(201).json({
      files: files,
    });
  } else {
    try {
      files = await File.find({ ParentId: ParentId });
    } catch (err) {
      const error = new HttpError("Can not get the folder", 500);
      return next(error);
    }

    res.status(201).json({
      files: files,
    });
  }
};

module.exports = getFiles;
