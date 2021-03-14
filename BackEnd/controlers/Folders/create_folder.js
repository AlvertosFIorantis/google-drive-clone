const HttpError = require("../../error/http-error");
const Folder = require("../../models/folder");

const createdFolder = async (req, res, next) => {
  let { FolderName, ParentId, path } = req.body;
  // console.log("req.body", req.body);
  console.log("Path", path);

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
  if (childFolder && childFolder.length > 0) {
    return next(new HttpError("Folder already exists.", 422));
  }

  let createdFolder;
  if (ParentId != undefined) {
    createdFolder = new Folder({
      FolderName: FolderName,
      ParentId: ParentId,
      path: path + "/" + ParentFolder.FolderName,
      path_ids: path + "/" + ParentFolder._id,
    });
  } else {
    createdFolder = new Folder({
      FolderName: FolderName,
      ParentId: ParentId,
      path: "ROOT",
      path_ids: "/",
    });
  }

  try {
    // console.log("try to save a Folder");
    await createdFolder.save();
    // console.log("worked");

    if (ParentId != undefined) {
      ParentFolder.childFolders.push(createdFolder);
      await ParentFolder.save();
    }
  } catch (err) {
    console.log(err);
    const error = new HttpError("Creating Folder failed please try again", 500);
    return next(error);
  }

  // vrisko ola ta folders pou einai sto root folder mesa mias aki den exoun parentId kai girnao afta oste an dimiourgiso kainourgio
  // folder sto root level perno afto pou molis eftiaksa mazi me ola ta ala einai ena workaround gia to root fodler mnono, giati se ola ta
  // aala tha stelno apla to ParentFolder pou tha exei ola ta child fodlers
  let RootFolder;
  if (ParentId == undefined) {
    // console.log("Undefined PranetDI");
    try {
      RootFolder = await Folder.find({ ParentId: { $exists: false } });
    } catch (err) {
      const error = new HttpError(
        "Creating Folder failed please try again,on RootFolder",
        500
      );
      return next(error);
    }
    // console.log("RootFolder !!!", RootFolder);

    res.status(201).json({
      folder: {
        FolderName: "Root",
        path: "ROOT",
        path_ids: "/",
        childFolders: RootFolder,
      },
    });
  } else {
    try {
      RootFolder = await Folder.find({ ParentId: ParentId });
    } catch (err) {
      const error = new HttpError(
        "Creating Folder failed please try again,on RootFolder",
        500
      );
      return next(error);
    }

    // console.log("Created folder", createdFolder);
    // console.log("RootFolder", RootFolder);
    res.status(201).json({
      folder: {
        folderId: ParentId,
        // afto borei na prepei na to alakso sto createdFolder._id
        FolderName: createdFolder.FolderName,
        path: createdFolder.path,
        path_ids: createdFolder.path_ids,
        childFolders: RootFolder,
      },
    });
  }
};
module.exports = createdFolder;
