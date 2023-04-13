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
    project: {
      type: Schema.Types.Number,
      ref: "Project",
    },
    overallRating: { type: Number },
    gameplayRating: { type: Number },
    historyRating: { type: Number },
    soundRating: { type: Number },
    likes: {
      type: [Schema.Types.Number],
      ref: "User",
    },
    dislikes: {
      type: [Schema.Types.Number],
      ref: "User",
    },
    comments: { type: [Schema.Types.ObjectId] },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
