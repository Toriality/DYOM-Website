const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statsSchema = new Schema(
  {
    user: { type: Schema.Types.Number, ref: "User", required: true },
    project: { type: Schema.Types.Number, ref: "Project", required: true },
    // Main stats
    highestProgress: { type: Number },
    lowestProgress: { type: Number },
    timesPassed: { type: Number },
    timesFailed: { type: Number },
    timesCrashed: { type: Number },
    timesPlayed: { type: Number },
    // Editor
    hasEdited: { type: Boolean, default: false },
    // Player
    timesWasted: { type: Number },
    timesBusted: { type: Number },
    failLowestElapsedTime: { type: Number },
    failHighestElapsedTime: { type: Number },
    passLowestElapsedTime: { type: Number },
    passHighestElapsedTime: { type: Number },
    // Actors
    highestAmountKilled: { type: Number },
    totalAmountKilled: { type: Number },
    highestAmountHS: { type: Number },
    totalAmountHS: { type: Number },
    // Vehicles
    highestAmountDestroyed: { type: Number },
    totalAmountDestroyed: { type: Number },
    // Pickups
    highestAmountPickedUp: { type: Number },
    totalAmountPickedUp: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Stats = mongoose.model("Stats", statsSchema);

module.exports = Stats;
