const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const projectSchema = new Schema(
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
    banner: { type: Boolean },
    gallery: { type: Boolean },
    tags: { type: [String] },
    trailer: { type: String },
    credits: { type: String },
    original: { type: String },
    motto: { type: String },
    music: { type: String },
    difficulty: { type: String },
    mods: { type: Boolean },
    views: { type: Number, default: 0 },
    weekViews: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
  },
  {
    _id: false,
    timestamps: true,
    discriminatorKey: "type",
  }
);

projectSchema.plugin(AutoIncrement, { id: "project_seq", start_seq: 0 });
const Project = mongoose.model("Project", projectSchema);

const missionPackSchema = new Schema({
  num: { type: Number, default: 1 },
});

const missionSchema = new Schema({
  // Mission specific fields
});

Project.discriminator("Mission", missionSchema);
Project.discriminator("MissionPack", missionPackSchema);

module.exports = Project;
