const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const missionPackSchema = new Schema(
  {
    missionTitle: {
      type: String,
      required: true,
    },
    missionAuthor: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    missionUploadDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    missionSummary: { type: String },
    officialReviews: { type: [Schema.Types.Mixed] },
    userReviews: { type: [Schema.Types.Mixed] },
    missionFullDescription: { type: String },
    missionAwards: { type: [Schema.Types.Mixed] },
    missionFile: {
      filename: { type: String, required: true },
      filedest: { type: String, required: true },
    },
    credits: { type: String },
    cast: { type: Schema.Types.Mixed },
    specsOriginalName: { type: String },
    specsMotto: { type: String },
    specsMainTheme: { type: String },
    specsDifficulty: { type: String },
    specsModsRequired: { type: String },
    specsNumberOfMissions: { type: Number },
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    tags: { type: [String] },
  },
  {
    _id: false,
    timestamps: true,
  }
);

missionPackSchema.plugin(AutoIncrement, { id: "mp_seq", start_seq: 0 });
const MissionPack = mongoose.model("MissionPack", missionPackSchema);

module.exports = MissionPack;
