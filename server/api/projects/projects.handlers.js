const Project = require("./projects.model");
const Mission = require("../missions").model;
const User = require("../users").model;
const fs = require("fs");
const crc = require("crc");
const { moveFiles } = require("../helpers.js");

const dyomRegex = new RegExp(/^file\.(zip|rar|dat)$/);
const galleryRegex = new RegExp(/^gallery_\d\.(jpg|png)$/);
const bannerRegex = new RegExp(/^banner\.(jpg|png)$/);

// Get list of projects
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

// Get single project
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

// Get trending projects
exports.getTrending = async (req, res) => {
  try {
    const trendingProjects = await Project.find()
      .sort({ weekViews: "desc" })
      .limit(4)
      .populate({
        path: "author",
        select: "username",
      });
    res.json(trendingProjects);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Add new project
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

// Update project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id },
      req.newProject,
      { new: true, overwriteDiscriminatorKey: true }
    );

    const projectPath = `${req.destPath}/${project._id}`;

    if (req.body.removeFile) findFileAndDelete(dyomRegex, projectPath);
    if (req.body.removeBanner) findFileAndDelete(bannerRegex, projectPath);
    if (req.body.removeGallery) findFileAndDelete(galleryRegex, projectPath);

    if (req.filePath) {
      findFileAndDelete(dyomRegex, projectPath);
      fs.rmSync(`${projectPath}/${req.filePath}`, { force: true });
      fs.renameSync(
        `${req.tempPath}/${req.filePath}`,
        `${projectPath}/file.${req.filePath.split(".").pop()}`
      );
    }
    if (req.bannerPath) {
      findFileAndDelete(bannerRegex, projectPath);
      fs.renameSync(
        `${req.tempPath}/${req.bannerPath}`,
        `${projectPath}/banner.${req.bannerPath.split(".").pop()}`
      );
    }
    if (req.galleryPath) {
      findFileAndDelete(galleryRegex, projectPath);
      req.galleryPath.forEach((img, i) => {
        fs.renameSync(
          `${req.tempPath}/${img}`,
          `${projectPath}/gallery_${i}.${img.split(".").pop()}`
        );
      });
    }
    if (!fs.existsSync(req.destPath)) {
      fs.mkdirSync(req.destPath, { recursive: true });
    }
    if (fs.existsSync(req.tempPath)) {
      fs.rmSync(req.tempPath, { force: true, recursive: true });
    }
    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Something went wrong. Try again later." });
  }
};

exports.copyProject = async (req, res) => {
  try {
    const project = await Project.findById(req.body.id);
    const copiedProject = await Project.create({ ...project.toObject() });

    // Copy files from original project to copied project
    const projectPath = `./public/uploads/${req.user.id}/${project.type}s/${project._id}`;
    const destPath = `./public/uploads/${req.user.id}/${project.type}s/${copiedProject._id}`;
    fs.mkdirSync(destPath, { recursive: true });
    const files = fs.readdirSync(projectPath);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = `${projectPath}/${file}`;
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        fs.copyFileSync(filePath, `${destPath}/${file}`);
      }
    }
    res.json(copiedProject);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Something went wrong. Try again later." });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const projectPath = `./public/uploads/${req.user.id}/${project.type}s/${project._id}`;
    fs.rmSync(projectPath, { force: true, recursive: true });
    await Project.deleteOne({ _id: req.params.id });
    await User.updateOne({ _id: req.user.id }, { $pull: { projects: req.params.id } });
    res.json({ msg: "Project deleted" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Something went wrong. Try again later." });
  }
};

function findFileAndDelete(fileRegex, folder) {
  const files = fs.readdirSync(folder);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = `${folder}/${file}`;
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      if (fileRegex.test(file)) {
        fs.rmSync(filePath, { force: true });
      }
    }
  }
}

async function createCRC(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath);
    const crcValue = crc.crc32(fileContent);
    return crcValue;
  } catch (err) {
    throw err;
  }
}

module.exports = exports;
