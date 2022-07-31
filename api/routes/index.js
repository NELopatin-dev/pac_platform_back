const Router = require("express");
const userRouter = require("./userRouter.js");
const tutorRouter = require("./tutorRouter.js");
const platformRouter = require("./platformRouter.js");

const router = new Router();

router.use("/user", userRouter);
router.use("/tutor", tutorRouter);
router.use("/platform", platformRouter);

module.exports = router;
