const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    mode: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.Number,
      ref: "User",
      required: true,
    },
    mission: {
      type: Schema.Types.Number,
      ref: "Mission",
    },
    mp: {
      type: Schema.Types.Number,
      ref: "MissionPack",
    },
    overallRating: { type: Number },
    gameplayRating: { type: Number },
    historyRating: { type: Number },
    soundRating: { type: Number },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    comments: { type: [Schema.Types.ObjectId] },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
