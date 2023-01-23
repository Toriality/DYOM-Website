const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const missionSchema = new Schema(
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
    specsOriginalName: { type: String },
    specsMotto: { type: String },
    specsMainTheme: { type: String },
    specsDifficulty: { type: String },
    specsModsRequired: { type: String },
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    tags: { type: [String] },
  },
  {
    timestamps: true,
  }
);

missionSchema.plugin(mongoosePaginate);
const Mission = mongoose.model("Mission", missionSchema);

module.exports = Mission;
