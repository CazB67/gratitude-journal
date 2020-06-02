let express = require("express");
let isAuth = require("../../config/middleware/isAuthenticated").isAuth;
const router = express.Router();
// const db = require("../../models");
//const { Op } = require("sequelize");
// let passport = require("../../config/passport");
var gratitudeController = require('../../controllers/gratitude_controller');

router.get("/", gratitudeController.root)
router.get("/newgratitude", isAuth, gratitudeController.newGratitude)
router.get("/viewgratitude", isAuth, gratitudeController.viewGratitude)


module.exports = router;