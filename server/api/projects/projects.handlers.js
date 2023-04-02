const Project = require("./projects.model");
const User = require("../users").model;

// Get list of projects
exports.getList = async (req, res) => {
  try {
    const type = req.params.type;
    const resultsPerPage = req.query.limit || 20;
    const page = req.query.page || 1;
    const regex = new RegExp(req.query.search, "i");
    const filter = {
      type: type,
      ...(req.query.search && { title: { $regex: regex } }),
    };
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

    const totalProjects = await projects.countDocuments(filter);

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

    res.json(project);
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
    const author = req.user.id;
    const { file, banner } = req.files;
    const gallery = req.files.gallery || [];

    // Required fields
    if (!req.body.title || !file)
      return res
        .status(400)
        .json({ msg: "Please insert the required fields." });

    // Limit tags and links amount to a maximum of 3 tags
    let tags = req.body.tags.split(",").filter((empty) => empty !== "");
    if (tags.length > 3) {
      return res.status(400).json({ msg: "No more than 3 tags are allowed!" });
    }

    const newProject = {
      type: req.body.type,
      title: req.body.title,
      author,
      summary: req.body.summary,
      description: req.body.description,
      banner: banner ? banner[0].originalName : null,
      trailer: req.body.trailer,
      gallery: gallery.map((f) => f.originalName),
      file: file[0].originalName,
      credits: req.body.credits,
      tags,
      original: req.body.original,
      motto: req.body.motto,
      music: req.body.music,
      difficulty: req.body.difficulty,
      mods: req.body.mods,
      num: req.body.num,
    };

    const project = await Project.create(newProject);
    await fs.promises.rename(
      `./uploads/${author}/${req.body.type}/uploading/`,
      `./uploads/${author}/${req.body.type}/${project._id}`
    );
    await User.updateOne({ _id: author }, { $push: { projects: project._id } });

    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Something went wrong. Try again later." });
  }
};

module.exports = exports;
