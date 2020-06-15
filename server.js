require('dotenv').config()  
const db = require("./models");  
// Requiring necessary npm packages
const express = require("express"); 
const app = express();   
const passport = require('passport'); 
const router = require("./routes/router");
require('./config/passport');
const expressSession = require("express-session"); 
const SessionStore = require('express-session-sequelize')(expressSession.Store); 
const cookieParser = require('cookie-parser'); 
const exphbs = require("express-handlebars");
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080;
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


app.use(router);
// Syncing our database and logging a message to the user upon success
db.sequelize.sync({/*force: true*/ }).then(function() {
  console.log('Nice! Database looks fine')
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
}).catch(function (err) {
  console.log(err, "Something went wrong with the Database Update!")
});