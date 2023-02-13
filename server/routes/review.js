const router = require("express").Router();
const auth = require("../middleware/auth");
const Review = require("../models/Reviews");
const User = require("../models/User");
const Mission = require("../models/Mission");

router.post("/add", auth, (req, res) => {
  const {
    mode,
    content,
    mission,
    mp,
    overallRating,
    gameplayRating,
    historyRating,
    soundRating,
  } = req.body;
  const author = req.user.id;

  if (!mode || !(mission || mp) || !content)
    return res.status(400).json({ msg: "Please insert the required fields." });

  const newReview = new Review({
    mode,
    author,
    content,
    mission,
    mp,
    overallRating,
    gameplayRating,
    historyRating,
    soundRating,
  });

  newReview
    .save()
    .then((review) => {
      User.updateOne(
        { _id: author },
        {
          $push: { reviews: review._id },
        },
        (err, data) => {}
      );
      if (mission)
        Mission.updateOne(
          { _id: mission },
          {
            $push: { reviews: review._id },
          },
          (err, data) => {}
        );
      res.json(review);
      console.log(review);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: "Something went wrong. Please try again" });
    });
});

router.get("/:id", (req, res) => {
  Review.findOne({ _id: id }).then((review) => {
    res.send(review);
  });
});

router.post("/:id/like", auth, (req, res) => {
  const { id } = req.params;
  const user = req.user.id;

  Review.exists({ _id: id, likes: user }).then((result) => {
    let resultData = {};
    if (result) {
      User.updateOne({ _id: user }, { $pull: { likes: id } }, (err, data) => {
        if (err) console.log(err);
      });
      Review.findOneAndUpdate(
        { _id: id },
        { $pull: { likes: user } },
        { new: true },
        (err, data) => {
          if (err) console.log(err);
          res.json(data);
        }
      );
    } else {
      User.updateOne({ _id: user }, { $push: { likes: id } }, (err, data) => {
        if (err) console.log(err);
      });
      Review.findOneAndUpdate(
        { _id: id },
        { $push: { likes: user } },
        { new: true },
        (err, data) => {
          if (err) console.log(err);
          res.json(data);
        }
      );
    }
  });
});

module.exports = router;
