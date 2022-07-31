const Router = require("express");
const userController = require("../controllers/userController");

const router = new Router();

router.post("/logIn", userController.logIn);
router.post("/check", userController.check);
router.post("/getUserInfo", userController.getUserInfo);
// router.post("/getUserPoints", userController.getUserPoints);

module.exports = router;
