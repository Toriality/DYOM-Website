const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dailyPickSchema = new Schema({
  project: {
    type: Schema.Types.Number,
    required: true,
    ref: "Project",
  },
  completedBy: {
    type: [Schema.Types.Number],
    ref: "User",
  },
});

const DailyPick = mongoose.model("DailyPick", dailyPickSchema);
module.exports = DailyPick;
