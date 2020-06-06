let express = require("express");
const router = express.Router();
let passport = require("../../config/passport");
var gratitudeController = require('../../controllers/gratitude_controller');

router.post("/api/searched", gratitudeController.searched)
router.post("/api/submitted", gratitudeController.submitted)
// Using the passport.authenticate middleware with our local strategy.
router.post("/api/login", passport.authenticate("local"), function(req, res) {
  res.json(req.user);
});
router.get("/api/count", gratitudeController.countGratitudes)
router.post("/api/signup", gratitudeController.apiSignup);
router.post("/api/logout", gratitudeController.logOut);
router.post("/api/user_data", gratitudeController.apiUserData); //reservered and not used at this stage
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/newgratitude',
    failureRedirect: '/'
  }));


module.exports = router;