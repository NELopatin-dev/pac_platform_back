const Router = require("express");
const userController = require("../controllers/platformController");

const router = new Router();

router.get("/getOUP", userController.getOUP);
router.post("/getRating_PAS", userController.getRating_PAS);
router.post("/getRating_rating_day", userController.getRating_rating_day);
router.post(
    "/getRating_rating_criteria",
    userController.getRating_rating_criteria
);
router.post(
    "/getRating_rating_subcriteria",
    userController.getRating_rating_subcriteria
);
router.get("/getCompitions", userController.getCompitions);
router.get("/getCalendar", userController.getCalendar);
router.get("/getPASgroup", userController.getPASgroup);

module.exports = router;
