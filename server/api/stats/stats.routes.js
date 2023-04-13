const router = require("express").Router();
const handlers = require("./stats.handlers");
const auth = require("../../middleware/auth");

//router.get("/", handlers.getStats);
router.post("/report/", auth, handlers.report);

module.exports = router;
