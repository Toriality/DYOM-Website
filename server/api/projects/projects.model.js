const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const fileSchema = new Schema(
  {
    filename: { type: String, required: true },
    file: { type: String, required: true },
  },
  {
    _id: false,
  }
);

const missionSchema = new Schema(
  {
    title: { type: String, required: true },
    file: { type: String, required: true },
    sd: [fileSchema],
    summary: { type: String },
    stats: [{ type: Schema.Types.ObjectId, ref: "Stats" }],
  },
  {
    _id: false,
  }
);

const projectSchema = new Schema(
  {
    // Main information
    type: {
      type: Number,
      enum: [0, 1, 2], // 0: Single Mission, 1: Mission Pack, 2: Storyline
      required: true,
    },
    title: { type: String, required: true },
    author: { type: Schema.Types.Number, ref: "User", required: true },

    // Optional information
    summary: { type: String },
    description: { type: String },
    tags: { type: [String] },
    trailer: { type: String },
    credits: { type: String },
    motto: { type: String },
    music: { type: String },
    mods: { type: Boolean },
    difficulty: {
      type: Number,
      enum: [0, 1, 2, 3], // 0: Easy, 1: Normal, 2: Hard, 3: Insane
    },

    // Missions
    missions: [missionSchema],

    // CRC
    banner: { type: String },
    gallery: { type: [String] },
    modloader: [fileSchema],

    // Front-end features
    awards: { type: [Schema.Types.Mixed] },

    // User-interactions
    reviews: { type: [Schema.Types.ObjectId], ref: "Review" },

    // Statistics
    views: { type: Number, default: 0 },
    weekViews: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
  },
  {
    _id: false,
    timestamps: true,
  }
);

projectSchema.plugin(AutoIncrement, { id: "project_seq", start_seq: 0 });
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
