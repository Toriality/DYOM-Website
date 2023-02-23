const router = require("express").Router();
const auth = require("../middleware/auth");
const Review = require("../models/Reviews");
const User = require("../models/User");
const Mission = require("../models/Mission");
const Project = require("../models/Project");

router.get("/", async (req, res) => {
  const missions = await Project.countDocuments({ type: "Mission" }).exec();
  const missionPacks = await Project.countDocuments({
    type: "MissionPack",
  }).exec();
  const users = await User.countDocuments({}).exec();
  // get newest registered member and get only the username string
  const newestUser = await User.findOne({}).sort({ createdAt: -1 }).exec();

  res.json({
    missions,
    missionPacks,
    users,
    newestUser,
  });
});

module.exports = router;
