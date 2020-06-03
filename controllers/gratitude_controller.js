const db = require("../models");
const { Op } = require("sequelize");

exports = module.exports

//-------
exports.root = function (req, res) {
  db.Gratitude.findAll({
    limit: 10,   //R?
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
    console.log("line21 in controller-got the 10 shared gratutudes from server")
    console.log(hbsObject);
    res.render("login", hbsObject);
  })
};

exports.newGratitude = function (req, res) {
  res.render("newGratitude");
};

exports.searched = function (req, res) {
  console.log("date the data requested for: " + req.body.createdAt); //the date the data is requested for
  db.Gratitude.findOne({
    where: {
      createdAt: { [Op.startsWith]: req.body.createdAt }
    }
  }).then(function (dbGratitude) {
    console.log("gratitude found based on date query: " + dbGratitude);
    res.json(dbGratitude);
  })
};

exports.viewGratitude = function (req, res) {
  res.render("viewGratitude");
};

//Post to insert gratitude to database
exports.submitted = function (req, res) {
  db.Gratitude.create({
    description: req.body.description,
    action: req.body.action,
    shareable: req.body.shareable
  })
    .then(function (dbGratitude) {
      res.json(dbGratitude);
    });
};

exports.apiSignup = function (req, res, done) {
  db.User.findOne({ where: { email: req.body.email } }).then(function (user) {
    if (user) {
      console.log("User duplicate")
      res.status(401).json({ success: false, msg: "That email is already taken" });
      //res.status(401).json({err:"That email is already taken"});
      //return done(null, false, { message: 'That email is already taken' });
    }
    else {
      db.User.create({    //user authenticatend but not in db - hence will be signed up
        email: req.body.email,
        password: req.body.password
      })
        .then(function (user) {
          return done(null, user, {    //no error in the operation, user didn't exist and user created 
            message: "no issue with db writing!"
          });
        })
        .catch(function (err) {    //issue with signing up the athuenticated fb user in app db
          console.log(err)
          return done(null, false, {    // error in the operation,
            message: "Error in db operation to signup fb user!"
          });
        });
    }
  });
};

// Route for logging user out
exports.logOut = function (req, res) {
  req.logout() //automatically removes the user from the session if local user
  console.log("signout successful")
  res.send({ message: "signout successful" });
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


