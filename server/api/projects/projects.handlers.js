const Project = require("./projects.model");
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
    const type = req.params.type;
    const author = req.query.author || null;
    const id = req.query.id || null;
    const title = new RegExp(req.query.title, "i");
    const filter = {
      type: type,
      ...(author && { author }),
      ...(title && { title }),
      ...(id && { _id: id }),
    };

    const totalProjects = await Project.countDocuments(filter);
    const resultsPerPage = req.query.limit || 20;
    const numberOfPages = Math.ceil(totalProjects / resultsPerPage);
    const page = Math.min(req.query.page, numberOfPages) || 1;

    const select = [
      "title",
      "author",
      "updatedAt",
      "rating",
      "downloads",
      "views",
      "comments",
    ];

    const projects = await Project.find(filter)
      .select(select)
      .limit(resultsPerPage)
      .skip(resultsPerPage * (page - 1))
      .sort({ updatedAt: "desc" })
      .populate({
        path: "author",
        select: "username",
      });

    res.json({ projects, totalProjects });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Get single project
exports.getSingle = async (req, res) => {
  try {
    const week = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const type = req.params.type;
    const id = req.params.id;
    const cookieName = `view_${type}_${id}`;

    let select;
    let populate = [{ path: "author", select: "username" }];
    if (req.query.hasOwnProperty("reviews")) {
      select = ["title", "author", "awards", "reviews"];
      populate.push({
        path: "reviews",
        populate: { path: "author", select: ["username", "hasAvatar"] },
      });
    } else {
      select = ["-awards", "-reviews"];
    }

    const project = await Project.findOne({ _id: id }).populate(populate).select(select);

    if (!req.cookies[cookieName]) {
      await project.updateOne({ $inc: { views: 1, weekViews: 1 } }).exec();
      res.cookie(cookieName, true, { maxAge: week });
    }

    // loop through files inside project folder
    const projectPath = `./public/uploads/${project.author.id}/${project.type}s/${id}/`;
    const projectFiles = {
      file: null,
      gallery: [],
      banner: null,
    };
    const files = fs.readdirSync(projectPath);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = `${projectPath}/${file}`;
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        if (dyomRegex.test(file)) projectFiles.file = file;
        if (galleryRegex.test(file)) projectFiles.gallery.push(file);
        if (bannerRegex.test(file)) projectFiles.banner = file;
      }
    }
    res.json({ project, projectFiles });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getCRC = async (req, res) => {
  try {
    const project = await Project.findOne({ crc: req.params.crc });
    if (!project)
      return res.status(404).json({ msg: "No projects found with this CRC!" });
    res.json(project);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const PATH = `./public/uploads/missions/`;
    const type = req.params.type;
    const slot = req.query.slot;

    const numOfProjects = await Project.countDocuments({ type: type });

    const randomProject = Math.floor(Math.random() * numOfProjects);
    const project = await Project.findOne({ type })
      .sort({ updatedAt: "desc" })
      .skip(randomProject);

    const randomMission = Math.floor(Math.random() * project.missions.length);
    const mission = project.missions[randomMission];

    res.json({ mission });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal Server Error" });
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
    moveFiles([
      { name: req.newProject.missions.map((mission) => mission.file), to: "missions" },
      {
        name: req.newProject.missions
          .flatMap((mission) => mission.sd || [])
          .map((sd) => sd.file),
        to: "audio",
      },
      { name: req.newProject.banner, to: "images" },
      { name: req.newProject.gallery, to: "images" },
    ]);

    const project = await Project.create(req.newProject);
    await User.updateOne({ _id: req.user.id }, { $push: { projects: project._id } });

    res.json(project);
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
