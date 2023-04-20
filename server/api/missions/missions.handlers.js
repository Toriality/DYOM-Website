const Project = require("../projects").model;
const Mission = require("./missions.model");

exports.getList = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate({
      path: "missions",
    });

    if (!project) {
      return res
        .status(404)
        .json({ msg: `Project of ID ${req.params.projectId} not found` });
    }

    const missions = project.missions;
    res.json(missions);
  } catch (e) {
    console.log(e);
  }
};

exports.getSingle = async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.missionId);

    if (!mission) {
      return res
        .status(404)
        .json({ msg: `Mission of ID ${req.params.missionId} not found` });
    }

    res.json(mission);
  } catch (e) {
    console.log(e);
  }
};

exports.getRandom = async (req, res) => {
  const numOfProjects = await Project.countDocuments();
  const randomProjectIndex = Math.floor(Math.random() * numOfProjects);
  const project = await Project.findOne().skip(randomProjectIndex);
  const missions = project.missions;
  const randomMissionIndex = Math.floor(Math.random() * missions.length);
  const missionId = missions[randomMissionIndex];
  const mission = await Mission.findById(missionId);
  res.json(mission);
};
