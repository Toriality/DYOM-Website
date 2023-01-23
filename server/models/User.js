const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    missions: [Schema.Types.ObjectId],
    missionPacks: [Schema.Types.ObjectId],
    tutorials: [Schema.Types.ObjectId],
    reviews: [Schema.Types.ObjectId],
    points: { type: Number, default: 0 },
    lastVisit: { type: Date, required: true, default: Date.now },
    rank: { type: String, required: true, default: "Junior Member" },
    awards: { type: [Schema.Types.Mixed] },
    aboutMe: { type: String },
    pinnedProject: { type: Schema.Types.ObjectId },
    pinnedAward: { type: Schema.Types.ObjectId },
    avatar: { type: Buffer },
    nationality: { type: String },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("User", userSchema);

module.exports = Users;
