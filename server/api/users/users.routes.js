const auth = require("../../middleware/auth");
const { makeCRC } = require("../../middleware/upload");
const router = require("express").Router();
const handlers = require("./users.handlers");
const middleware = require("./users.middleware");

router.get("/list", handlers.listUsers);
router.get("/id/:id", handlers.getUser);
router.get("/profile", auth, handlers.getProfile);

router.post("/login", handlers.login);
router.post(
  "/register",
  middleware.uploadAvatar,
  makeCRC,
  middleware.validateAvatarFile,
  middleware.validateRegister,
  handlers.register
);

module.exports = router;
