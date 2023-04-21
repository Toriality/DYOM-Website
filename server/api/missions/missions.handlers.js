const Project = require("../projects").model;
const Mission = require("./missions.model");
const { createReadMe, createArchive } = require("../helpers.js");

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
    const shouldDownloadMods = req.query.shouldDownloadMods;
    const shouldDownloadSD = req.query.shouldDownloadSD;
    const slot = req.query.slot || 1;
    const id = req.params.missionId;

    const populate = {
      path: "project",
      select: ["title", "author", "modloader"],
      populate: {
        path: "author",
        select: "username",
      },
    };

    const mission = await Mission.findOne({
      ...(isCRC ? { crc: id } : { _id: id }),
    }).populate(populate);
    console.log(mission);

    if (!mission) {
      return res.status(404).json({
        error: `Mission of ${isCRC ? "CRC" : "ID"} ${id} not found`,
      });
    }

    if (!shouldDownloadMods && !shouldDownloadSD) {
      return res.download(`./public/uploads/missions/${mission.file}`, `DYOM${slot}.dat`);
    } else {
      const files = [];
      if (shouldDownloadMods) {
        for (let i = 0; i < mission.project.modloader.length; i++) {
          const mod = mission.projects.modloader[i];
          files.push({
            name: `${mod.file}`,
            type: "modloader",
            dest: `modloader/${mission.project.title}/${mod.filename}`,
          });
        }
      }
      if (shouldDownloadSD) {
        for (let i = 0; i < mission.sd.length; i++) {
          const sd = mission.sd[i];
          files.push({
            name: `${sd.file}`,
            type: "audio",
            dest: `SD/${sd.filename}`,
          });
        }
      }
      files.push({
        name: `${mission.file}`,
        type: "missions",
        dest: `DYOM${slot}.dat`,
      });
      const readme = createReadMe(mission);
      const downloadPath = await createArchive(files, {
        name: "README.txt",
        content: readme,
      });
      return res.download(downloadPath, `${mission.title}.zip`);
    }
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
