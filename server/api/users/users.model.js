const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new Schema(
  {
    // Main information
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
    aboutMe: { type: String },
    location: { type: String },
    hasAvatar: { type: Boolean },

    // Stats
    stats: [{ type: Schema.Types.ObjectId, ref: "Stats" }],

    // User-made contents
    projects: {
      type: [Schema.Types.Number],
      ref: "Project",
    },
    tutorials: [Schema.Types.ObjectId],
    reviews: [Schema.Types.ObjectId],

    // Front-end features
    pinnedProject: { type: Schema.Types.ObjectId },
    pinnedAward: { type: Schema.Types.ObjectId },
    awards: { type: [Schema.Types.Mixed] },

    // Access and rank control
    role: {
      type: String,
      required: true,
      default: "User",
    },
    rank: { type: Number, required: true, default: 0 },
    points: { type: Number, default: 0 },
  },
  {
    _id: false,
    timestamps: true,
  }
);

userSchema.plugin(AutoIncrement, { id: "user_seq", start_seq: 0 });
const User = mongoose.model("User", userSchema);

module.exports = User;
