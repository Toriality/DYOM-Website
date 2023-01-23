const router = require("express").Router();
let MissionPack = require("../models/MissionPack");
let User = require("../models/User");
const auth = require("../middleware/auth");
const { createStorage, createUpload } = require("../upload");

// Get list of mission packs
router.get("/list", auth, (req, res) => {
  MissionPack.find({})
    .lean()
    .then(async (missions) => {
      res.json(missions);
    });
});

// MissionPack search
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

  MissionPack.paginate(query, options)
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
  MissionPack.findOne({ _id: id }).then((mission) =>
    res.json(mission.missionFile)
  );
});

// Add mission
router.post("/add", auth, (req, res) => {
  // Get user id
  const userID = req.user.id;

  // Mission file vars
  let filename, filedest;

  // Mission params
  const {
    missionTitle,
    missionSummary,
    missionFullDescription,
    missionFile,
    credits,
    specsOriginalName,
    specsMotto,
    specsMainTheme,
    specsDifficulty,
    specsModsRequired,
    specsNumberOfMissions,
    tags,
  } = req.body;

  // Required fields
  if (!missionTitle || !missionFile) {
    return res.status(400).json({ msg: "Please insert the required fields." });
  }

  // Limit tags and links ammount to a maximum of 6 tags
  if (tags.length > 3)
    return res.status(400).json({ msg: "No more than 3 tags are allowed!" });

  // Upload mission file
  const storage = createStorage("missions");
  const upload = createUpload("mission", storage);
  upload(req, res, (err) => {
    // Get errors
    if (err) return res.status(400).json({ err });
    filename = req.file.filename;
    filedest = req.file.filedest;
  });

  const newMission = new Mission({
    missionTitle,
    missionSummary,
    missionFullDescription,
    missionFile: {
      filename,
      filedest,
    },
    credits,
    specsOriginalName,
    specsMotto,
    specsMainTheme,
    specsDifficulty,
    specsModsRequired,
    tags,
    missionAuthor: userID,
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
      res.status(400).json({ msg: "Something went wrong. Try again later." });
    });
});

module.exports = router;
