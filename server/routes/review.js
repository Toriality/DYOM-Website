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
        ),
          res.json(review);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: "Something went wrong. Please try again" });
    });
});

module.exports = router;
