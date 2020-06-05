const mongoose = require("mongoose");
const projectSchema = mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true },
});

const Project = mongoose.model("Project", projectSchema);
module.exports.Project = Project;
