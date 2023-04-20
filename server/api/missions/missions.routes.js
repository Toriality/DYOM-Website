const router = require("express").Router();
const auth = require("../../middleware/auth");

router.get("/list/:projectId", handlers.getList);
router.get("/view/:missionId", handlers.getSingle);
router.get("/random", handlers.getRandom);

router.post("/add", auth, handlers.addMission);

router.patch("/update/:missionId", auth, handlers.updateMission);

router.delete("/delete/:missionId", auth, handlers.deleteMission);

module.exports = router;
