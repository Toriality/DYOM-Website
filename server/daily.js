const Project = require("./models/Project");
const DailyPick = require("./models/DailyPicks");
const Mission = require("./models/Mission");
const MissionPack = require("./models/MissionPack");

function getRandom(object) {
  let rand = Math.floor(Math.random() * object.length);
  return rand;
}

async function setDailyPicks() {
  const missions = await Project.find({ type: "Mission" });
  const mps = await Project.find({ type: "MissionPack" });

  let randomMissions = [getRandom(missions), getRandom(missions)];
  let randomMissionPacks = [getRandom(mps), getRandom(mps)];

  while (randomMissions[0] === randomMissions[1]) {
    randomMissions[0] = getRandom(missions);
  }
  while (randomMissionPacks[0] === randomMissionPacks[1]) {
    randomMissionPacks[0] = getRandom(mps);
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

module.exports = setDailyPicks;
