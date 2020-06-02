require('dotenv').config()  //yes
const db = require("./models");  //yes
// Requiring necessary npm packages
const express = require("express"); //yes
const app = express();   //yes
const passport = require('passport'); //yes
const router = require("./routes/router");
require('./config/passport');
const expressSession = require("express-session"); //yes
const SessionStore = require('express-session-sequelize')(expressSession.Store); //yes
const cookieParser = require('cookie-parser'); //change
//const Sequelize = require('sequelize') //change
//let FacebookStrategy = require('passport-facebook').Strategy
// Requiring passport as we've configured it
//const passport = require("./config/passport");
const exphbs = require("express-handlebars");
// Setting up port and requiring models for syncing
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080;
// Creating express app and configuring middleware needed for authentication


app.use(cookieParser());  
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const sequelizeSessionStore = new SessionStore({
  db: db.sequelize,
});
// We need to use sessions to keep track of our user's login status
app.use(expressSession({ 
  secret: "keyboard cat", 
  resave: true, 
  saveUninitialized: true ,
  store: sequelizeSessionStore,
  cookie: {
    maxAge: 1000 * 60 * 5 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
//require("./routes/html-routes.js")(app);
//require("./routes/api-routes.js")(app);
app.use(router);
// Syncing our database and logging a message to the user upon success
db.sequelize.sync( ).then(function() {
  console.log('Nice! Database looks fine')
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
}).catch(function (err) {
  console.log(err, "Something went wrong with the Database Update!")
});