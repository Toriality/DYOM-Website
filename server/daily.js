const DailyPick = require("./models/DailyPicks");
const Mission = require("./models/Mission");
const MissionPack = require("./models/MissionPack");

async function setDailyPicks() {
  const missions = await Mission.find({});
  const mps = await MissionPack.find({});

  let randomMission1 = Math.floor(Math.random() * missions.length);
  let randomMission2 = Math.floor(Math.random() * missions.length);
  let randomMp1 = Math.floor(Math.random() * mps.length);
  let randomMp2 = Math.floor(Math.random() * mps.length);

  while (randomMission1 === randomMission2) {
    randomMission1 = Math.floor(Math.random() * missions.length);
  }
  while (randomMp1 === randomMp2) {
    randomMp1 = Math.floor(Math.random() * mps.length);
  }

  const dailyPicks = {
    missions: [missions[randomMission1]._id, missions[randomMission2]._id],
    mps: [mps[randomMp1]._id, mps[randomMp2]._id],
  };

  await DailyPick.deleteMany({})
    .then(() => {
      console.log("DailyPicks has been reset");
    })
    .catch((err) => console.log(err));

  await DailyPick.create(dailyPicks)
    .then(() => {
      console.log("Daily Picks created successfully!");
    })
    .catch((err) => console.log(err));
}

module.exports = setDailyPicks;
