const Project = require("../projects").model;
const Mission = require("./missions.model");
const { createReadMe, createArchive } = require("../helpers.js");

/** Retrieves the list of missions for a project with the given ID. */
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
    res.status(500).json({ error: "Failed to retrieve missions" });
  }
};

/** Retrieves a single mission with the given ID or CRC value. */
exports.getSingle = async (req, res) => {
  try {
    // Set this to true if you want to get mission using CRC value
    const isCRC = req.query.isCRC;
    const id = req.params.missionId;

    // Get mission with the given ID or CRC
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
    res.status(500).json({ error: "Failed to retrieve mission" });
  }
};

/** Downloads a mission with the given ID or CRC value. Generates a archive if `shouldDownloadMods` or `shouldDownloadSD` queries are set */
exports.download = async (req, res) => {
  try {
    // Set this to true if you want to get mission using CRC value
    const isCRC = req.query.isCRC;
    // Set these to true if you want to generate a archive that includes these files
    const shouldDownloadMods = req.query.shouldDownloadMods;
    const shouldDownloadSD = req.query.shouldDownloadSD;
    // Mission slot DYOMX.dat where X is the slot value (default is 1)
    const slot = req.query.slot || 1;

    const id = req.params.missionId;

    // Populate the project attached to the mission and its author
    const populate = {
      path: "project",
      select: ["title", "author", "modloader"],
      populate: {
        path: "author",
        select: "username",
      },
    };

    // Find the mission with the given ID or CRC value and populate the project and author fields.
    const mission = await Mission.findOne({
      ...(isCRC ? { crc: id } : { _id: id }),
    }).populate(populate);

    if (!mission) {
      return res.status(404).json({
        error: `Mission of ${isCRC ? "CRC" : "ID"} ${id} not found`,
      });
    }

    // If shouldDownloadMods and shouldDownloadSD are both false, download only the mission file.
    if (!shouldDownloadMods && !shouldDownloadSD) {
      return res.download(`./public/uploads/missions/${mission.file}`, `DYOM${slot}.dat`);
    } else {
      // Generate archive including requested files and folders
      const files = [];
      // If shouldDownloadMods is true, add each mod file to the array.
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
      // If shouldDownloadSD is true, add each sound file to the array.
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
      // Add the mission file to the array.
      files.push({
        name: `${mission.file}`,
        type: "missions",
        dest: `DYOM${slot}.dat`,
      });
      // Create a README file for the archive.
      const readme = createReadMe(mission);

      // Create the archive and get the download path.
      const downloadPath = await createArchive(files, {
        name: "README.txt",
        content: readme,
      });

      return res.download(downloadPath, `${mission.title}.zip`);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

/** Retrieves a random mission. */
exports.getRandom = async (req, res) => {
  try {
    // Get the number of projects in the database and select a random one
    const numOfProjects = await Project.countDocuments();
    const randomProjectIndex = Math.floor(Math.random() * numOfProjects);
    const project = await Project.findOne().skip(randomProjectIndex);

    // Get the list of missions for the project and select a random one
    const missions = project.missions;
    const randomMissionIndex = Math.floor(Math.random() * missions.length);
    const missionId = missions[randomMissionIndex];
    const mission = await Mission.findById(missionId);

    // Return the mission
    res.json(mission);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to get random mission" });
  }
};
