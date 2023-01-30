const router = require("express").Router();
let Mission = require("../models/Mission");
let User = require("../models/User");
const auth = require("../middleware/auth");
const { createStorage, createUpload, upload } = require("../upload");

// Get list of missions
router.get("/list", auth, (req, res) => {
  Mission.find({})
    .lean()
    .then(async (missions) => {
      res.json(missions);
    });
});

// Mission search
router.get("/", auth, (req, res) => {
  const resultsPerPage = req.query.limit || 10;

  const query = {
    approved: true,
    $text: { $search: req.query.search },
    score: { $meta: "textScore" },
  };
  const options = {
    sort: { score: { $meta: "textScore" } },
    offset: resultsPerPage * (req.query.page - 1) || 0,
    limit: resultsPerPage,
    lean: true,
  };

  Mission.paginate(query, options)
    .then(async (missions) => {
      res.json(missions);
    })
    .catch((err) => {
      console.log(err);
      res.json({});
    });
});

// Downlaod mission file
router.get("/download/:id", auth, (req, res) => {
  // ID of the audio as in the database
  const { id } = req.params;
  // Return the link
  Mission.findOne({ _id: id }).then((mission) => res.json(mission.missionFile));
});

// Add mission
router.post("/add", auth, upload.single("file"), (req, res) => {
  console.log(req.file);
  // Get user id
  const userID = req.user.id;

  // Mission file vars
  let filename = req.file.filename;
  let filedest = req.file.destination;

  // Mission params
  const {
    title,
    date,
    summary,
    description,
    banner,
    trailer,
    images,
    credits,
    tags,
    originalName,
    motto,
    musicTheme,
    difficulty,
    modsRequired,
  } = req.body;

  // Required fields
  if (!title || !filename) {
    return res.status(400).json({ msg: "Please insert the required fields." });
  }

  // Limit tags and links ammount to a maximum of 6 tags
  if (tags.length > 3)
    return res.status(400).json({ msg: "No more than 3 tags are allowed!" });

  const newMission = new Mission({
    title,
    author: userID,
    date,
    summary,
    description,
    banner,
    trailer,
    images,
    file: {
      filename,
      filedest,
    },
    credits,
    tags,
    originalName,
    motto,
    musicTheme,
    difficulty,
    modsRequired,
  });

  newMission
    .save()
    .then((mission) => {
      // Add request to user database
      User.updateOne(
        { _id: userID },
        {
          $push: { missions: mission._id },
        },
        (err, data) => {}
      );
      res.json({ msg: "Mission added into the database!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: "Something went wrong. Try again later." });
    });
});

module.exports = router;
