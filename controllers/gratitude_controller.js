let express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
      res.render("login");
  });

  router.get("/n", function(req, res) {
    res.render("newGratitude");
});

router.get("/v", function(req, res) {
    res.render("viewGratitude");
});


  module.exports = router;