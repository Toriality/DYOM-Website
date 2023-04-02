const auth = require("../../middleware/auth");
const router = require("express").Router();
const handlers = require("./users.handlers");
const middleware = require("./users.middleware");

router.get("/", handlers.getAllUsers);
router.get("/id/:id", handlers.getUser);
router.get("/profile", auth, handlers.getProfile);

router.post("/login", middleware.validateLogin, handlers.login);
router.post(
  "/register",
  middleware.validateRegister,
  middleware.registerUser,
  handlers.register
);

router.patch("/id/:id", auth, handlers.updateUser);

module.exports = router;
