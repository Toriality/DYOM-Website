const router = require("express").Router();
const handlers = require("./daily.handlers");

router.get("/", handlers.getDaily);

module.exports = router;
