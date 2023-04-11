const Project = require("./projects.model");
const User = require("../users").model;
const fs = require("fs");

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

    const project = await Project.findOne({ _id: id })
      .populate(populate)
      .select(select);

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
    // const tempPath = `./public/uploads/${req.user.id}/temp/${req.project}`;
    // const destPath = `./public/uploads/${req.user.id}/${req.body.type}s`;
    // const bannerPath = req.files.banner
    //   ? req.files.banner[0].originalname
    //   : null;
    // const galleryPath = req.files.gallery
    //   ? req.files.gallery.map((f) => f.originalname)
    //   : null;
    // const filePath = req.files.file[0].originalname;

    // const newProject = {
    //   type: req.body.type,
    //   title: req.body.title,
    //   author: req.user.id,
    //   summary: req.body.summary,
    //   description: req.body.description,
    //   banner: !!req.files.banner,
    //   gallery: !!req.files.gallery,
    //   trailer: req.body.trailer,
    //   credits: req.body.credits,
    //   tags: req.body.tags ? req.body.tags.split(",") : [],
    //   original: req.body.original,
    //   motto: req.body.motto,
    //   music: req.body.music,
    //   difficulty: req.body.difficulty,
    //   mods: req.body.mods,
    //   num: req.body.num,
    // };
    const project = await Project.create(req.newProject);

    // Start renaming files
    fs.renameSync(
      `${req.tempPath}/${req.filePath}`,
      `${req.tempPath}/file.${req.filePath.split(".").pop()}`
    );
    if (req.bannerPath) {
      fs.renameSync(
        `${req.tempPath}/${req.bannerPath}`,
        `${req.tempPath}/banner.${req.bannerPath.split(".").pop()}`
      );
    }
    if (req.galleryPath) {
      req.galleryPath.forEach((img, i) => {
        fs.renameSync(
          `${req.tempPath}/${img}`,
          `${req.tempPath}/gallery_${i}.${img.split(".").pop()}`
        );
      });
    }
    if (!fs.existsSync(req.destPath)) {
      fs.mkdirSync(req.destPath, { recursive: true });
    }
    fs.renameSync(req.tempPath, `${req.destPath}/${project._id}`);

    await User.updateOne(
      { _id: req.user.id },
      { $push: { projects: project._id } }
    );

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
      console.log("yes");
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
    await User.updateOne(
      { _id: req.user.id },
      { $pull: { projects: req.params.id } }
    );
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

module.exports = exports;
