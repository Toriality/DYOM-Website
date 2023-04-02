const Review = require("./reviews.model");
const User = require("../users").model;
const Project = require("../projects").model;

exports.getReview = async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id });
    res.json(review);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.addReview = async (req, res) => {
  try {
    const {
      mode,
      content,
      project,
      overallRating,
      gameplayRating,
      historyRating,
      soundRating,
    } = req.body;
    const author = req.user.id;

    if (!mode || !project || !content)
      return res
        .status(400)
        .json({ msg: "Please insert the required fields." });

    const newReview = new Review({
      mode,
      author,
      content,
      project,
      overallRating,
      gameplayRating,
      historyRating,
      soundRating,
    });

    const review = await newReview.save();

    await User.updateOne({ _id: author }, { $push: { reviews: review._id } });
    await Project.updateOne(
      { _id: project },
      { $push: { reviews: review._id } }
    );

    res.json(review);
    console.log(review);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.likeReview = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user.id;

    const reviewExists = await Review.exists({ _id: id, likes: user });

    await User.updateOne(
      { _id: user },
      { [reviewExists ? $pull : $push]: { likes: id } }
    );

    const review = await Review.findOneAndUpdate(
      { _id: id },
      { [reviewExists ? $pull : $push]: { likes: user } },
      { new: true }
    );

    res.json(review);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = exports;
