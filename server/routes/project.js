const router = require("express").Router();
let Mission = require("../models/Mission");
let User = require("../models/User");
const auth = require("../middleware/auth");
const { upload } = require("../multer/project");
const fs = require("fs");
const MissionPack = require("../models/MissionPack");

// Get list of missions
router.get("/list/:type", (req, res) => {
  const type = req.params.type;
  const resultsPerPage = req.query.limit || 20;
  const page = req.query.page || 1;
  const regex = new RegExp(req.query.search, "i");
  const filter = req.query.search ? { title: { $regex: regex } } : {};

  if (type === "mission") {
    Mission.find(filter)
      .select([
        "title",
        "author",
        "updatedAt",
        "rating",
        "views",
        "downloads",
        "comments",
      ])
      .limit(resultsPerPage)
      .skip(resultsPerPage * (page - 1))
      .sort({ updatedAt: "desc" })
      .populate({
        path: "author",
        select: "username",
      })
      .exec((err, list) => {
        Mission.countDocuments().then((total) => res.send({ list, total }));
      });
  }

  if (type === "mp") {
    MissionPack.find(filter)
      .select("title author updatedAt rating views downloads comments")
      .limit(resultsPerPage)
      .skip(resultsPerPage * (page - 1))
      .sort({ updatedAt: "desc" })
      .populate({
        path: "author",
        select: "username",
      })
      .exec((err, events) => {
        res.json(events);
      });
  }
});

// Get mission
router.get("/:type/:id", (req, res) => {
  const week = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  const type = req.params.type;
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

  if (type === "mission") {
    const cookieName = `view_mission_${req.params.id}`;
    Mission.findOne({ _id: req.params.id })
      .populate(populate)
      .select(select)
      .then((project) => {
        if (!req.cookies[cookieName]) {
          project.updateOne({ $inc: { views: 1 } }).exec();
          res.cookie(cookieName, true, { maxAge: week });
        }
        res.json(project);
      });
  }

  if (type === "mp") {
    const cookieName = `view_mp_${req.params.id}`;
    MissionPack.findOne({ _id: req.params.id })
      .populate(populate)
      .select(select)
      .then((project) => {
        if (!req.cookies[cookieName]) {
          project.updateOne({ $inc: { views: 1 } }).exec();
          res.cookie(cookieName, true, { maxAge: week });
        }
        res.json(project);
      });
  }
});

// Add mission
router.post(
  "/add",
  auth,
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "gallery", maxCount: 5 },
  ]),
  (req, res) => {
    let author = req.user.id;
    let file = null;
    let banner = null;
    let gallery = [];

    // Mission file vars
    if (req.files["file"]) {
      file = req.files["file"][0].originalname;
    }
    if (req.files["banner"]) {
      banner = req.files["banner"][0].originalname;
    }
    if (req.files["gallery"]) {
      for (var x = 0; x < req.files["gallery"].length; x++) {
        gallery.push(req.files["gallery"][x].originalname);
      }
    }
    let tags = req.body.tags.split(",");
    tags = tags.filter((empty) => empty !== "");

    // Mission params
    const { type } = req.body;

    // Required fields
    if (!req.body.title || !file) {
      console.log(req.body.file);
      return res
        .status(400)
        .json({ msg: "Please insert the required fields." });
    }

    // Limit tags and links ammount to a maximum of 3 tags
    if (tags.length > 3)
      return res.status(400).json({ msg: "No more than 3 tags are allowed!" });

    const newProject = {
      title: req.body.title,
      author,
      summary: req.body.summary,
      description: req.body.description,
      banner,
      trailer: req.body.trailer,
      gallery,
      file,
      credits: req.body.credits,
      tags,
      original: req.body.original,
      motto: req.body.moto,
      music: req.body.music,
      difficulty: req.body.difficulty,
      mods: req.body.mods,
      num: req.body.num,
    };

    if (type === "mission") {
      const newMission = new Mission(newProject);
      newMission
        .save()
        .then((mission) => {
          fs.rename(
            `./uploads/${author}/missions/uploading/`,
            `./uploads/${author}/missions/${mission._id}`,
            (err) => {
              if (err) console.log(err);
            }
          );
          // Add request to user database
          User.updateOne(
            { _id: author },
            {
              $push: { missions: mission._id },
            },
            (err, data) => {}
          );
          res.json(mission);
        })
        .catch((err) => {
          console.log(err);
          res
            .status(400)
            .json({ msg: "Something went wrong. Try again later." });
        });
    }

    if (type === "mp") {
      const newMp = new MissionPack(newProject);
      newMp
        .save()
        .then((mp) => {
          fs.rename(
            `./uploads/${author}/mps/uploading/`,
            `./uploads/${author}/mps/${mp._id}`,
            (err) => {
              if (err) console.log(err);
            }
          );
          // Add request to user database
          User.updateOne(
            { _id: author },
            {
              $push: { missionPacks: mp._id },
            },
            (err, data) => {}
          );
          res.json(mp);
        })
        .catch((err) => {
          console.log(err);
          res
            .status(400)
            .json({ msg: "Something went wrong. Try again later." });
        });
    }
  }
);

module.exports = router;
