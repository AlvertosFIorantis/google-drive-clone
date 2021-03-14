const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const folderSchema = new Schema({
  FolderName: { type: String, required: true },
  ParentId: { type: String },
  path: { type: String, required: true },
  path_ids: { type: String, required: true },
  childFolders: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Folder" },
  ],
  // creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  // tha to kano comment out otan valo onthetication sto olo to thema
  // me to ref: kano to connection metaksi tou item kai tou user kai leo oti to kathe item prepei na exei to id apo to Schema User
});

module.exports = mongoose.model("Folder", folderSchema);
