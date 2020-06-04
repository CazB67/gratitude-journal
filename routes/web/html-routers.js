let express = require("express");
let isAuth = require("../../config/middleware/isAuthenticated").isAuth;
const router = express.Router();
let gratitudeController = require('../../controllers/gratitude_controller');

router.get("/", gratitudeController.root)
router.get("/newgratitude", isAuth, gratitudeController.newGratitude)
router.get("/viewgratitude", isAuth, gratitudeController.viewGratitude)

module.exports = router;