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
    project: { type: Schema.Types.Number, ref: "Project", required: true },
    title: { type: String, required: true },
    slot: { type: Number, required: true },
    file: { type: String, required: true },
    sd: [fileSchema],
    summary: { type: String },
    stats: [{ type: Schema.Types.ObjectId, ref: "Stats" }],
  },
  {
    _id: false,
    timestamps: true,
  }
);

missionSchema.plugin(AutoIncrement, { id: "mission_seq", start_seq: 0 });
const Mission = mongoose.model("Mission", missionSchema);

module.exports = Mission;
