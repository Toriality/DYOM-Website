const router = require("express").Router();
let Article = require("../models/Article");
const auth = require("../middleware/auth");

// Get list of articles
router.get("/list", auth, (req, res) => {
  Article.find({})
    .lean()
    .then(async (articles) => {
      res.json(articles);
    });
});

// Add article
router.post("/add", auth, (req, res) => {
  const { articleTitle, articleContent } = req.body;

  // Required fields
  if (!articleTitle || !articleContent) {
    return res.status(400).json({ msg: "Please insert the required fields." });
  }

  const newArticle = new Article({
    articleTitle,
    articleContent,
  });

  newArticle
    .save()
    .then((article) => {
      res.json({ msg: "Article added" });
    })
    .catch((err) => {
      res.status(400).json({ msg: "Something went wrong!" });
    });
});

module.exports = router;
