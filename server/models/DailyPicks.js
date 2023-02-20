const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dailyPickSchema = new Schema({
  project: {
    type: Schema.Types.Number,
    required: true,
    refPath: "projectType",
  },
  projectType: {
    type: String,
    required: true,
    enum: ["Mission", "MissionPack"],
  },
  completedBy: {
    type: [Schema.Types.Number],
    ref: "User",
  },
});

const DailyPick = mongoose.model("DailyPick", dailyPickSchema);
module.exports = DailyPick;
