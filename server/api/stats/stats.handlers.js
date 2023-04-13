const Project = require("../projects").model;
const User = require("../users").model;
const Stats = require("./stats.model");

// exports.getStats = async (req, res) => {
//   const missions = await Project.countDocuments({ type: "Mission" }).exec();
//   const missionPacks = await Project.countDocuments({
//     type: "MissionPack",
//   }).exec();
//   const users = await User.countDocuments({}).exec();
//   // get newest registered member and get only the username string
//   const newestUser = await User.findOne({})
//     .sort({ createdAt: -1 })
//     .select("_id username")
//     .exec();

//   res.json({
//     missions,
//     missionPacks,
//     users,
//     newestUser,
//   });
// };

exports.report = async (req, res) => {
  const user = await User.findById(req.user.id);
  const project = await Project.findById(req.body.project);

  if (!user || !project) {
    return res.status(400).json({ msg: `Bad request` });
  }

  const options = {
    upsert: true,
    new: true,
  };

  const stat = await Stats.findOneAndUpdate(
    {
      user: user._id,
      project: project._id,
    },
    {
      user: user._id,
      project: project._id,
    },
    options
  );

  const update = {
    $set: {
      ...(req.body.edited ? { hasEdited: true } : {}),
      ...(req.body.progress >= (stat.highestProgress || req.body.progress)
        ? { highestProgress: req.body.progress }
        : {}),
      ...(req.body.progress <= (stat.lowestProgress || req.body.progress)
        ? { lowestProgress: req.body.progress }
        : {}),
      ...(req.body.failed &&
      req.body.elapsedTime <= (stat.failLowestElapsedTime || req.body.elapsedTime)
        ? { failLowestElapsedTime: req.body.elapsedTime }
        : {}),
      ...(req.body.failed &&
      req.body.elapsedTime >= (stat.failHighestElapsedTime || req.body.elapsedTime)
        ? { failHighestElapsedTime: req.body.elapsedTime }
        : {}),
      ...(req.body.passed &&
      req.body.elapsedTime <= (stat.passLowestElapsedTime || req.body.elapsedTime)
        ? { passLowestElapsedTime: req.body.elapsedTime }
        : {}),
      ...(req.body.passed &&
      req.body.elapsedTime >= (stat.passHighestElapsedTime || req.body.elapsedTime)
        ? { passHighestElapsedTime: req.body.elapsedTime }
        : {}),
      ...(req.body.kills >= (stat.highestAmountKilled || req.body.kills)
        ? { highestAmountKilled: req.body.kills }
        : {}),
      ...(req.body.amountHS >= (stat.highestAmountHS || req.body.amountHS)
        ? { highestAmountHS: req.body.amountHS }
        : {}),
      ...(req.body.amountDestroyed >=
      (stat.highestAmountDestroyed || req.body.amountDestroyed)
        ? { highestAmountDestroyed: req.body.amountDestroyed }
        : {}),
      ...(req.body.amountPickedUp >=
      (stat.highestAmountPickedUp || req.body.amountPickedUp)
        ? { highestAmountPickedUp: req.body.amountPickedUp }
        : {}),
    },
    $inc: {
      ...(req.body.wasted ? { timesWasted: 1 } : {}),
      ...(req.body.busted ? { timesBusted: 1 } : {}),
      ...(req.body.passed ? { timesPassed: 1 } : {}),
      ...(req.body.failed ? { timesFailed: 1 } : {}),
      ...(req.body.crashed ? { timesCrashed: 1 } : {}),
      ...(req.body.played ? { timesPlayed: 1 } : {}),
      ...(req.body.kills ? { totalAmountKilled: req.body.kills } : {}),
      ...(req.body.amountHS ? { totalAmountHS: req.body.totalAmountHS } : {}),
      ...(req.body.amountPickedUp
        ? { totalAmountPickedUp: req.body.totalAmountPickedUp }
        : {}),
      ...(req.body.amountDestroyed
        ? { totalAmountDestroyed: req.body.amountDestroyed }
        : {}),
    },
  };

  const newStat = await Stats.findOneAndUpdate(
    { user: user._id, project: project._id },
    update,
    options
  );

  await Project.findByIdAndUpdate(project._id, {
    $push: { stats: stat._id },
  });

  await User.findByIdAndUpdate(user._id, {
    $push: { stats: stat._id },
  });

  res.json(newStat);
};

module.exports = exports;
