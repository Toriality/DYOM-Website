const mongoose = require("mongoose");
const Project = require("./Project");
const Schema = mongoose.Schema;

const missionPackSchema = new Schema({
  num: { type: Number, default: 1 },
});

const MissionPack = Project.discriminator("MissionPack", missionPackSchema);
module.exports = MissionPack;
