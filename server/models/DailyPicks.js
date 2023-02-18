const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dailyPickSchema = new Schema({
  missions: {
    type: [Schema.Types.Number],
    ref: "Mission",
  },
  mps: {
    type: [Schema.Types.Number],
    ref: "MissionPack",
  },
});

const DailyPick = mongoose.model("DailyPick", dailyPickSchema);
module.exports = DailyPick;
