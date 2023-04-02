const Project = require("../projects").model;
const User = require("../users").model;

exports.getStats = async (req, res) => {
  const missions = await Project.countDocuments({ type: "Mission" }).exec();
  const missionPacks = await Project.countDocuments({
    type: "MissionPack",
  }).exec();
  const users = await User.countDocuments({}).exec();
  // get newest registered member and get only the username string
  const newestUser = await User.findOne({})
    .sort({ createdAt: -1 })
    .select("_id username")
    .exec();

  res.json({
    missions,
    missionPacks,
    users,
    newestUser,
  });
};

module.exports = exports;
