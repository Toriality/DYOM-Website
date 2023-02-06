const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const articleSchema = new Schema(
  {
    articleTitle: {
      type: String,
      required: true,
    },
    articleUploadDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    articleContent: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
    timestamps: true,
  }
);

articleSchema.plugin(AutoIncrement, { _id: "article_seq", start_seq: 0 });
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
