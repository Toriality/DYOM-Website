const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    timestamps: true,
  }
);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
