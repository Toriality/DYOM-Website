const router = require("express").Router();
const handlers = require("./projects.handlers");
const middleware = require("./projects.middleware");
const auth = require("../../middleware/auth");

router.get("/list/:type", handlers.getList);
router.get("/view/:id", handlers.getSingle);
router.get("/trending", handlers.getTrending);

router.post("/add", auth, middleware.uploadProject, handlers.addProject);
//router.patch("/update/:id", auth, uploadProject, handlers.updateProject);
//router.delete("/delete/:id", auth, handlers.deleteProject);

module.exports = router;
