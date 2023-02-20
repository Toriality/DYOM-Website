const DailyPick = require("../models/DailyPicks");

const router = require("express").Router();

router.get("/", (req, res) => {
  const populate = [
    {
      path: "project",
      populate: {
        path: "author",
        select: "username",
      },
    },
  ];

  DailyPick.find()
    .populate(populate)
    .exec((err, picks) => {
      res.json(picks);
    });
});

module.exports = router;
