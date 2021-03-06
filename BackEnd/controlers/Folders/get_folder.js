const HttpError = require("../../error/http-error");
const Folder = require("../../models/folder");

const getFolder = async (req, res, next) => {
  const ParentId = req.body.ParentId;
  console.log("ParentId", req.body);
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
        folderId: undefined,
        FolderName: "Root",
        path: "/",
        path_ids: "/",
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
        folderId: myMainFolder._id,
        FolderName: myMainFolder.FolderName,
        path: myMainFolder.path,
        path_ids: myMainFolder.path_ids,
        childFolders: RootFolder,
      },
    });
  }
};

module.exports = getFolder;
