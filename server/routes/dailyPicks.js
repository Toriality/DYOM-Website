const DailyPick = require("../models/DailyPicks");

const router = require("express").Router();

router.get("/", (req, res) => {
  const populate = [
    {
      path: "missions",
      populate: {
        path: "author",
        select: "username",
      },
    },
    {
      path: "mps",
      populate: {
        path: "author",
        select: "username",
      },
    },
  ];

  DailyPick.find({})
    .populate(populate)
    .exec((err, picks) => {
      res.json(picks[0]);
    });
});

module.exports = router;
