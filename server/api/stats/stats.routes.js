const router = require("express").Router();
const handlers = require("./stats.handlers");

router.get("/", handlers.getStats);

module.exports = router;
