const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const missionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    summary: { type: String },
    officialReviews: { type: [Schema.Types.Mixed] },
    userReviews: { type: [Schema.Types.Mixed] },
    description: { type: String },
    awards: { type: [Schema.Types.Mixed] },
    file: {
      filename: { type: String, required: true },
      filedest: { type: String, required: true },
    },
    tags: { type: [String] },
    trailer: { type: String },
    credits: { type: String },
    originalName: { type: String },
    motto: { type: String },
    mainTheme: { type: String },
    difficulty: { type: String },
    modsRequired: { type: Boolean },
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

missionSchema.plugin(mongoosePaginate);
const Mission = mongoose.model("Mission", missionSchema);

module.exports = Mission;
