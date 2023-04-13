const utils = require("./daily.utils");
const Project = require("../projects").model;
const cron = require("node-cron");
const DailyPick = require("./daily.model");

async function setDailyPicks() {
  const missions = await Project.find({ type: "Mission" });
  const mps = await Project.find({ type: "MissionPack" });

  let randomMissions = [utils.getRandom(missions), utils.getRandom(missions)];
  let randomMissionPacks = [utils.getRandom(mps), utils.getRandom(mps)];

  while (randomMissions[0] === randomMissions[1]) {
    randomMissions[0] = utils.getRandom(missions);
  }
  while (randomMissionPacks[0] === randomMissionPacks[1]) {
    randomMissionPacks[0] = utils.getRandom(mps);
  }

  const dailyPicks = [];
  randomMissions.forEach((mission) => {
    dailyPicks.push({ project: missions[mission]._id });
  });
  randomMissionPacks.forEach((mp) => {
    dailyPicks.push({ project: mps[mp]._id });
  });

  await DailyPick.deleteMany({})
    .then(() => {
      console.log("DailyPicks has been reset");
    })
    .catch((err) => console.log(err));

  await DailyPick.create(dailyPicks)
    .then(() => {
      console.log("Daily Picks created successfully!", dailyPicks);
    })
    .catch((err) => console.log(err));
}

function startDaily() {
  cron.schedule(
    // (debug) "*/5 * * * * *",
    "0 0 * * *",
    () => {
      setDailyPicks();
    },
    {
      scheduled: true,
      timezone: "America/Los_Angeles",
    }
  );
  console.log("Daily picks cron job has been started");
}

module.exports = {
  startDaily,
  setDailyPicks,
};
