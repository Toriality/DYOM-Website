const DailyPick = require("./daily.model");

exports.getDaily = (req, res) => {
  try {
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
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = exports;
