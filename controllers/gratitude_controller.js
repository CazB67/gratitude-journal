/* eslint-disable no-undef */
const db = require("../models");
const { Op } = require("sequelize");

exports = module.exports

//Selects all the gratitudes that have been shared by the user. Ordered by ID from most recent
exports.root = function (req, res) {
  db.Gratitude.findAll({
    limit: 20,
    where: {
      shareable: true,
    },
      order: [['id', 'DESC']]  
  }).then(function (results) {
    let data = results.map((result) => {
      return { description: result.description }
    })
    let hbsObject = {
      results: data
    };
    res.render("login", hbsObject);
  })
};

exports.newGratitude = function (req, res) {
  res.render("newGratitude");
};

//Finds the gratitude in the database of the date clicked on calendar matching the current user
exports.searched = function (req, res) {
  db.Gratitude.findOne({
    where: {
      createdAt: { [Op.startsWith]: req.body.createdAt },
      UserId: req.user.id
    }
  }).then(function (dbGratitude) {
    res.json(dbGratitude);
  })
};

exports.viewGratitude = function (req, res) {
  res.render("viewGratitude");
};

//Post to insert gratitude to database. Only one gratitude per date
exports.submitted = function (req, res) {
  let editFlag = req.body.editFlag
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  db.Gratitude.findOne({where: { UserId: req.user.id, createdAt: date }}).then(function (gratitude){
    // if (gratitude && req.body.editFlag===false){
    //   res.status(403).json({ success: false, msg: "You've already made a post today" });
    // } 
    if (editFlag==="true") { 
      db.Gratitude.update({
        description: req.body.description,
        action: req.body.action,
        shareable: req.body.shareable,
        UserId: req.user.id
      }, {where: { UserId: req.user.id, createdAt: date }})
        .then(function (dbGratitude) {
          res.json(dbGratitude);
        });
     } 
     if (editFlag==="false") {
      db.Gratitude.create({
        description: req.body.description,
        action: req.body.action,
        shareable: req.body.shareable,
        UserId: req.user.id
      })
        .then(function (dbGratitude) {
          res.json(dbGratitude);
        });
    }
  });
};


exports.apiSignup = function (req, res, done) {
  db.User.findOne({ where: { email: req.body.email } }).then(function (user) {
    if (user) {
      res.status(202).json({ success: false, message: "That email is already taken" });
      return;
    }
  });
      db.User.create({    //no error in the operation, user didn't exist and user created
        email: req.body.email,
        password: req.body.password
      })
        .then(function () {
          res.json({ success: true, message: "That user is created, proceed to login!" }).redirect(307, "/api/login");

        })
        .catch(function () {
          return done(null, false, { Message: "Error in db operation!" });
        });
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

//Gets all the gratitudes from database where the userid matches the user currently logged in
exports.countGratitudes = function (req, res) {
  db.Gratitude.findAndCountAll({ where: { UserId: req.user.id } 
  })
  .then(result => {
    res.json(result.count);
  });
};
