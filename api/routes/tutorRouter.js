const Router = require("express");
const tutorController = require("../controllers/tutorController");

const router = new Router();

router.post("/getTutorPASgroup", tutorController.getTutorPASgroup);
router.post("/updatePoint", tutorController.updatePoint);

module.exports = router;
