const db = require("../models");
const { Op } = require("sequelize");

exports = module.exports

//-------
exports.root = function (req, res) {
  db.Gratitude.findAll({
    limit: 20,

    where: {
      shareable: true,
    },
    order: [['id', 'DESC']]  //R?
  }).then(function (results) {
    let data = results.map((result) => {
      return { description: result.description }
    })
    let hbsObject = {
      results: data
    };
    console.log("line21 in controller")
    console.log(hbsObject);
    res.render("login", hbsObject);
  })
};

exports.newGratitude = function (req, res) {
  res.render("newGratitude");
};

exports.searched = function (req, res) {
  console.log(req.body.createdAt);
  db.Gratitude.findOne({
    where: {
      createdAt: { [Op.startsWith]: req.body.createdAt },
      UserId: req.user.id
    }
  }).then(function (dbGratitude) {
    console.log(dbGratitude);
    res.json(dbGratitude);
  })
};

exports.viewGratitude = function (req, res) {
  res.render("viewGratitude");
};

//Post to insert gratitude to database
exports.submitted = function (req, res) {
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  console.log(date);
  db.Gratitude.findOne({where: { userId: req.user.id, createdAt: date }}).then(function (gratitude){
    if (gratitude){
      console.log("There is already a gratitude posted for today");
      res.status(403).json({ success: false, msg: "You've already made a post today" });
      return;
    }
  });
  db.Gratitude.create({
    description: req.body.description,
    action: req.body.action,
    shareable: req.body.shareable,
    UserId: req.user.id
  })
    .then(function (dbGratitude) {
      res.json(dbGratitude);
    });
};

exports.apiSignup = function (req, res, done) {
  db.User.findOne({ where: { email: req.body.email } }).then(function (user) {
    if (user) {
      res.status(202).json({ success: false, message: "That email is already taken" });
      return;
      //res.status(401).json({err:"That email is already taken"});
      //return done(null, false, { message: 'That email is already taken' });
    }
  });
    //else {
      db.User.create({    //no error in the operation, user didn't exist and user created
        email: req.body.email,
        password: req.body.password
      })
        .then(function () {
          // Return the success of the insert.....
         // res.status(202).json({ success: true, message: "Giddy Up" });
          // Then redirecct to the login api. 
          console.log("user created on line 80 contoller.js")
          res.json({ success: true, message: "That user is created, proceed to login!" }).redirect(307, "/api/login");
          //console.log(data)
         //res.redirect("/newGratitude");

        })
        .catch(function (err) {
          return done(null, false, { Message: "Error in db operation!" });
        });
   // }
  //});
};

// Route for logging user out
exports.logOut = function (req, res) {
  req.logout();  //automatically removes the user from the session 
  res.redirect("/");
};

// Route for getting some data about our user to be used client side
exports.apiUserData = function (req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
};


