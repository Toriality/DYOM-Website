const mongoose = require("mongoose");
const Project = require("./Project");
const Schema = mongoose.Schema;

const missionSchema = new Schema({
  // Mission specific fields
});

const Mission = Project.discriminator("Mission", missionSchema);
module.exports = Mission;
