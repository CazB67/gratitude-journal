const passport = require("passport");//passport frame work which is a milldeware framework that integrates with exp.js app and handles all 
//authentication logic using specifc strategies we choose i.e. passport locat or passport JWT or passport-OAuth or passport-instgram.. allows developers to devlelop 
//other middlewares/strategies for authentication
// Passport strategy:    Each strategy uses the passport JS framework as a template 
// Passport strategy:  The passport local strategy utilizes Cookies, Express Sessions, and some authentication logic
// Passport example strategies:  passport-local, Passport-JWT, Passport-OAuth, Passport-Google, instragram
// Setting up port and requiring models for syncing
let LocalStrategy = require("passport-local").Strategy;
let db = require("../models");
let FacebookStrategy = require('passport-facebook').Strategy
// Our user will sign in using an email, rather than a "username"
const customFields =
{
  usernameField: "email"    //we make a post request and provide a json body that will give us "email" 
  //passport as middleware will find "email" and populates the email in the next function below
},

  verifyCallback = (email, password, done) => {  // the email will be looked for in the database
    // When a user tries to sign in this code runs 
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function (dbUser) {
      //console.log({dbUser})
      // If there's no user with the given email
      if (!dbUser) {
        console.log("1")
        return done(null, false, {    //no error in the operation but this is also not a user
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {   //validates the passport , this function is defined in the USER model
        console.log("2")
        return done(null, false, {                    // we just say there was no error but the password was also invalid
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user  
      console.log("3")
      return done(null, dbUser);  //we say no error and return the authenticated user and continues to the route
    })
      .catch((err) => {
        console.log("4")
        done(err)
      });
  }
//------------------------------------------------------------
passport.use(new FacebookStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL,
  profileFields: ['name', 'email', 'link', 'locale', 'timezone', 'gender'],
  passReqToCallback: true,
  //passResToCallback: true
},
  function (req, accessToken, refreshToken, profile, done) {
    db.User.findOne({ where: { 'facebookId': profile.id } }).then(function (user) {
      if (user) {
        console.log('existing user');
        return done(null, user);  //user authenticated by FB and found in local database
      }
      else {    //user authenticated but not found  in database hence proceed to signup inside local DB
        db.User.create({
          facebookId: profile.id,
          facebookToken: accessToken,
          facebookName: profile.name.givenName + ' ' + profile.name.familyName,
          email: profile._json.email,
        })
          .then(function (user) {
            console.log('created user');
            return done(null, user)
            // res.redirect(307, "/api/login");
          })
          .catch(function (err) {
            console.log(err)
            return done(err, null)
            // res.status(401).json(err);
            //res.redirect("/"); 

          });
        //console.log('nowhere');
        //console.log(profile);
      }
    }).catch(err => {
      done(err)
    })
  }
));
//------------------------------------------------------------

const strategy = new LocalStrategy(customFields, verifyCallback);

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(strategy)
// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (user, cb) {     //this will put the user id into session 
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {   //when user coming out of session we grab that user id from database
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
