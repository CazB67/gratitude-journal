let express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
      res.render("login");
  });

router.get("/newgratitude", function(req, res) {
    res.render("newGratitude");
});

router.get("/viewgratitude", function(req, res) {
    res.render("viewGratitude");
});

//These two posts were used to check that I'd grabbed the right element from the html. It would need to be altered.
router.post("/api/login", function(req, res) {
   if(req.body.email === "caroline.portilla@gmail.com" && req.body.password === "done") {
       res.json({authenticated: true})
   }else{
    res.json({authenticated: false})
   }
  });

  router.post("/api/signup", function(req, res) {
    if(req.body.email === "caroline.portilla@gmail.com" && req.body.password === "done") {
        res.json({authenticated: true})
    }else{
     res.json({authenticated: false})
    }
   });

  module.exports = router;