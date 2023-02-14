const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const missionPackSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.Number,
      ref: "User",
      required: true,
    },
    summary: { type: String },
    reviews: {
      type: [Schema.Types.ObjectId],
      ref: "Review",
    },
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
    num: { type: Number },
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
  },
  {
    _id: false,
    timestamps: true,
  }
);

missionPackSchema.plugin(AutoIncrement, { id: "mp_seq", start_seq: 0 });
const MissionPack = mongoose.model("MissionPack", missionPackSchema);
module.exports = MissionPack;
