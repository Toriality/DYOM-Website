const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const missionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    summary: { type: String },
    officialReviews: { type: [Schema.Types.Mixed] },
    userReviews: { type: [Schema.Types.Mixed] },
    description: { type: String },
    awards: { type: [Schema.Types.Mixed] },
    file: { type: String },
    banner: { type: String },
    gallery: { type: [String] },
    tags: { type: [String] },
    trailer: { type: String },
    credits: { type: String },
    original: { type: String },
    motto: { type: String },
    music: { type: String },
    difficulty: { type: String },
    mods: { type: Boolean },
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
  },
  {
    _id: false,
    timestamps: true,
  }
);

missionSchema.plugin(AutoIncrement, { start_seq: 0 });
const Mission = mongoose.model("Mission", missionSchema);
module.exports = Mission;
