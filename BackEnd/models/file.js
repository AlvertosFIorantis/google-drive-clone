const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fileSchema = new Schema({
  FileName: { type: String, required: true },
  ParentId: { type: String },
  path: { type: String, required: true },
  path_ids: { type: String, required: true },
});

module.exports = mongoose.model("File", fileSchema);
