const router = require("express").Router();
let Mission = require("../models/Mission");
let User = require("../models/User");
const auth = require("../middleware/auth");
const { upload } = require("../multer/project");
const fs = require("fs");
const MissionPack = require("../models/MissionPack");
const doc = [
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Nadine",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Logan",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Ilchester",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Coral",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Fairmount",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Hall",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Homeworth",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Forbestown",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Remington",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Blodgett",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Cuylerville",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Lund",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Ahwahnee",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Loyalhanna",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Wattsville",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Caspar",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Spokane",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Herlong",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Hollins",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Somerset",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Gratton",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Garfield",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Greer",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Stollings",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Derwood",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Garnet",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Dexter",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Caroleen",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Saranap",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Klondike",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Eureka",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Gorst",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Calverton",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Valmy",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Leola",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Rivereno",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Groton",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Springhill",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Dorneyville",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Blanford",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Nanafalia",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Crawfordsville",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Kaka",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Winchester",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Islandia",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Silkworth",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Healy",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Abiquiu",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Croom",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Celeryville",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Bawcomville",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Callaghan",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Gila",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Cliff",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Thomasville",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Reinerton",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Alleghenyville",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Dixie",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Monument",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Comptche",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Caroline",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Harborton",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Roderfield",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Cataract",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Brownsville",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Elrama",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Craig",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Virgie",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Hollymead",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Saticoy",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Mahtowa",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Richmond",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Austinburg",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Interlochen",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Jacksonwald",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Montura",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Cornucopia",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Fingerville",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Zeba",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Deltaville",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Weeksville",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Reno",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Movico",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Dupuyer",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Convent",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Kraemer",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Jamestown",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Glenbrook",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Katonah",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Byrnedale",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Chamizal",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Shelby",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Linganore",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Roosevelt",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Waukeenah",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Hiko",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Waverly",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Shrewsbury",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Stockwell",
    author: 23,
  },
  {
    file: "DYOM_V80beta2 (1).zip",
    title: "Waterloo",
    author: 23,
  },
];
async function insertWithDelay() {
  for (const obj of doc) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // wait 1 second
    await Mission.create(obj);
    console.log("DONE");
  }
}
router.get("/asdf", async (req, res) => {
  await insertWithDelay();
  res.send("ALL SET");
});

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
    Mission.findOne({ _id: req.params.id })
      .populate(populate)
      .select(select)
      .exec((err, events) => {
        res.json(events);
      });
  }

  if (type === "mp") {
    MissionPack.findOne({ _id: req.params.id })
      .populate(populate)
      .select(select)
      .exec((err, events) => {
        res.json(events);
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
              $push: { mps: mp._id },
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
