const HttpError = require("../../error/http-error");
const Folder = require("../../models/folder");

const getFolder = async (req, res, next) => {
  const ParentId = req.body.ParentId;

  let RootFolder;
  if (ParentId == undefined) {
    try {
      RootFolder = await Folder.find({ ParentId: { $exists: false } });
    } catch (err) {
      const error = new HttpError("Can not get the folder", 500);
      return next(error);
    }

    res.status(201).json({
      folder: {
        FolderName: "Root",
        path: "",
        childFolders: RootFolder,
      },
    });
  } else {
    try {
      RootFolder = await Folder.find({ ParentId: ParentId });
    } catch (err) {
      const error = new HttpError("Can not get the folder", 500);
      return next(error);
    }
    let myMainFolder;
    try {
      myMainFolder = await Folder.findById(ParentId);
    } catch (err) {
      const error = new HttpError(
        "Creating Folder failed please try again,on RootFolder",
        500
      );
      return next(error);
    }

    res.status(201).json({
      folder: {
        FolderName: myMainFolder.FolderName,
        path: myMainFolder.path,
        childFolders: RootFolder,
      },
    });
  }
};

module.exports = getFolder;
