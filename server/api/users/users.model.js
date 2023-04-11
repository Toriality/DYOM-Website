const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

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
    email: {
      type: String,
      required: true,
    },
    projects: {
      type: [Schema.Types.Number],
      ref: "Project",
    },
    role: {
      type: String,
      required: true,
      default: "User",
    },
    tutorials: [Schema.Types.ObjectId],
    reviews: [Schema.Types.ObjectId],
    points: { type: Number, default: 0 },
    lastVisit: { type: Date, required: true, default: Date.now },
    rank: { type: Number, required: true, default: 0 },
    awards: { type: [Schema.Types.Mixed] },
    aboutMe: { type: String },
    pinnedProject: { type: Schema.Types.ObjectId },
    pinnedAward: { type: Schema.Types.ObjectId },
    hasAvatar: { type: Boolean },
    location: { type: String },
  },
  {
    _id: false,
    timestamps: true,
  }
);

userSchema.plugin(AutoIncrement, { id: "user_seq", start_seq: 0 });
const User = mongoose.model("User", userSchema);

module.exports = User;
