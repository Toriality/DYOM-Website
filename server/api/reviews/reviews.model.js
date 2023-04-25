const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["Project", "Mission"],
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: function () {
        return this.type === "Project";
      },
    },
    mission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mission",
      required: function () {
        return this.type === "Mission";
      },
    },
    interactions: {
      likes: [
        {
          user: { type: Schema.Types.Number, ref: "User" },
          date: { type: Date, default: Date.now },
        },
      ],
      dislikes: [
        {
          user: { type: Schema.Types.Number, ref: "User" },
          date: { type: Date, default: Date.now },
        },
      ],
    },
  },
  {
    timestamps: true,
    discriminatorKey: "mode",
  }
);

const officialReviewSchema = new Schema({
  gameplayRating: { type: Number },
  historyRating: { type: Number },
  soundRating: { type: Number },
});

const userReviewSchema = new Schema({
  overallRating: { type: Number },
});

const Review = mongoose.model("Review", reviewSchema);
Review.discriminator("OfficialReview", officialReviewSchema);
Review.discriminator("UserReview", userReviewSchema);
module.exports = Review;
