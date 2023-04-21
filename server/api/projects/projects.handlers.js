const Project = require("./projects.model");
const Mission = require("../missions").model;
const User = require("../users").model;
const fs = require("fs");
const crc = require("crc");
const { moveFiles, createArchive, createReadMe } = require("../helpers.js");
const archiver = require("archiver");
const { Readable } = require("stream");

const dyomRegex = new RegExp(/^file\.(zip|rar|dat)$/);
const galleryRegex = new RegExp(/^gallery_\d\.(jpg|png)$/);
const bannerRegex = new RegExp(/^banner\.(jpg|png)$/);

/** Retrieves the list of projects. */
exports.getList = async (req, res) => {
  try {
    const type = req.query.type || null;
    const author = req.query.author || null;
    const id = req.query.id || null;
    const title = new RegExp(req.query.title, "i");
    const filter = {
      ...(type && { type }),
      ...(author && { author }),
      ...(title && { title }),
      ...(id && { _id: id }),
    };

    const totalProjects = await Project.countDocuments(filter);
    const resultsPerPage = req.query.limit || 20;
    const numberOfPages = Math.ceil(totalProjects / resultsPerPage);
    const page = Math.min(req.query.page, numberOfPages) || 1;

    const projects = await Project.find(filter)
      .limit(resultsPerPage)
      .skip(resultsPerPage * (page - 1))
      .sort({ updatedAt: "desc" })
      .populate([{ path: "author", select: "username" }, { path: "missions" }]);

    res.json({ projects, totalProjects });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to retrieve projects" });
  }
};

/** Retrieves a single project with the given ID. */
exports.getSingle = async (req, res) => {
  try {
    const week = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const id = req.params.id;
    const cookieName = `view_${id}`;

    const project = await Project.findById(id).populate([
      { path: "author", select: "username" },
      { path: "missions" },
    ]);

    if (!req.cookies[cookieName]) {
      await project.updateOne({ $inc: { views: 1, weekViews: 1 } }).exec();
      res.cookie(cookieName, true, { maxAge: week });
    }

    res.json(project);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to retrieve project" });
  }
};

/** Downloads a project archive with the given ID. */
exports.download = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id).populate([
      { path: "missions" },
      { path: "author", select: "username" },
    ]);
    const missions = project.missions;
    const files = [];
    for (let i = 0; i < missions.length; i++) {
      const mission = missions[i];
      for (let j = 0; j < mission.sd.length; j++) {
        const sd = mission.sd[j];
        files.push({
          name: sd.file,
          type: "audio",
          dest: `SD/${sd.filename}`,
        });
      }
      files.push({
        name: mission.file,
        type: "missions",
        dest: `DYOM${mission.slot}.dat`,
      });
    }

    const readme = createReadMe(project);

    const downloadPath = await createArchive(files, {
      name: "README.txt",
      content: readme,
    });

    res.download(downloadPath, `${project.title}.zip`);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to download project" });
  }
};

/** Get random project */
exports.getRandom = async (req, res) => {
  try {
    const type = req.query.type;

    const numOfProjects = await Project.countDocuments({ type: type });
    const randomProject = Math.floor(Math.random() * numOfProjects);
    const project = await Project.findOne({ type })
      .sort({ updatedAt: "desc" })
      .skip(randomProject)
      .populate([{ path: "author", select: "username" }, { path: "missions" }]);

    res.json({ project });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to retrieve random project" });
  }
};

/** Adds a new project. */
exports.addProject = async (req, res) => {
  try {
    // Create new project
    moveFiles([
      { name: req.newProject.banner, to: "images" },
      { name: req.newProject.gallery, to: "images" },
    ]);
    const project = await Project.create(req.newProject);
    await User.updateOne({ _id: req.user.id }, { $push: { projects: project._id } });

    // Create missions
    moveFiles([
      { name: req.newMissions.map((mission) => mission.file), to: "missions" },
      {
        name: req.newMissions.flatMap((mission) => mission.sd || []).map((sd) => sd.file),
        to: "audio",
      },
    ]);
    const missions = [];
    for (let i = 0; i < req.newMissions.length; i++) {
      req.newMissions[i].project = project._id;
      const mission = await Mission.create(req.newMissions[i]);
      missions.push(mission._id);
    }

    // Update project with missions
    await Project.updateOne(
      { _id: project._id },
      { $push: { missions: { $each: missions } } }
    );

    res.redirect(`/api/projects/view/${project._id}`);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Something went wrong. Try again later." });
  }
};

module.exports = exports;
