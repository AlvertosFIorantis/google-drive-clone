const HttpError = require("../../error/http-error");
const Folder = require("../../models/folder");

const createdFolder = async (req, res, next) => {
  let { FolderName, ParentId, path } = req.body;
  const createdFolder = new Folder({
    FolderName: FolderName,
    ParentId: ParentId,
    path: path,
  });

  // gia na vro  parent folder oste na prosetheso sto array sto shema to neo folder pou eftiaksa
  let ParentFolder;

  if (ParentId != undefined) {
    try {
      ParentFolder = await Folder.findById(ParentId);
    } catch (err) {
      const error = new HttpError(
        "Creating Folder failed please try again, on ParentFolder",
        500
      );
      return next(error);
    }
  }

  // gia na tskerao an iparxei to folder me afto to onoma mesa sto parent folder
  let childFolder;
  if (ParentId != undefined) {
    try {
      childFolder = await Folder.find({
        ParentId: ParentId,
        FolderName: FolderName,
      });
    } catch (err) {
      const error = new HttpError(
        "Creating Folder failed please try again,on Chile Folder",
        500
      );
      return next(error);
    }
  }

  try {
    console.log("try to save a Folder");
    await createdFolder.save();
    console.log("worked");

    if (ParentId != undefined) {
      ParentFolder.childFolders.push(createdFolder);
      await ParentFolder.save();
    }
  } catch (err) {
    console.log(err);
    const error = new HttpError("Creating Folder failed please try again", 500);
    return next(error);
  }

  res.status(201).json({ folder: createdFolder });
};
module.exports = createdFolder;
