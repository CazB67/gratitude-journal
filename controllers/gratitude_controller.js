let express = require("express");
const router = express.Router();
const db = require("../models");


router.get("/", function(req, res) {
    db.Gratitude.findAll({attributes: ['description']}).then(function(results) {
        let data = results.map((result) => {
            return {description: result.description}
        })
        let hbsObject = {
            results: data
        };
        console.log(hbsObject);
        res.render("login", hbsObject);
    })
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