const router = require("express").Router();
const handlers = require("./reviews.handlers");
const auth = require("../../middleware/auth");

router.get("/:id", handlers.getReview);

router.post("/add", auth, handlers.addReview);
router.post("/:id/like", auth, handlers.likeReview);

module.exports = router;
