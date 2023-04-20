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
    const isCRC = req.query.isCRC;
    const id = req.params.missionId;

    const mission = await Mission.findOne({
      ...(isCRC ? { crc: id } : { _id: id }),
    });

    if (!mission) {
      return res.status(404).json({
        msg: `Mission of ${isCRC ? "CRC" : "ID"} ${id} not found`,
      });
    }

    res.json(mission);
  } catch (e) {
    console.log(e);
  }
};

exports.download = async (req, res) => {
  try {
    const isCRC = req.query.isCRC;
    const slot = req.query.slot || 1;
    const id = req.params.missionId;

    const mission = await Mission.findOne({
      ...(isCRC ? { crc: id } : { _id: id }),
    });

    if (!mission) {
      return res.status(404).json({
        msg: `Mission of ${isCRC ? "CRC" : "ID"} ${id} not found`,
      });
    }

    res.download(`./public/uploads/missions/${mission.file}`, `DYOM${slot}.dat`);
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
