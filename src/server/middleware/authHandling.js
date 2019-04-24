/*
  NOTE - File has been copied (and to some degree extended/modified) from
  course content by https://github.com/arcuri82
  https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/authentication/src/server/app.js
*/

const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');

const userRepo = require('../db/userRepo.js');
const routes = require('./authRoutes.js');

module.exports = app => {

  if(process.env.NODE_ENV === "production"){ //TODO(Håvard) Remember about this before exam
    console.log("We're in production");
    app.use(cors());
  }
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(session({
    secret: "A banana passed through here to seek support from bread",
    resave: false,
    cookie: {
      maxAge: 60 * 60 * 60 * 2 // long enough to test various stuff
    },
    saveUninitialized: false
  }));

  passport.use(new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    (username, password, done) => {
      const ok = userRepo.verifyUser(username, password);
      if(!ok) {
        return done(null, false, {message: 'Invalid username/password'});
      }
      const user = userRepo.getUser(username);
      return done(null, user);
    }
  ));

  passport.serializeUser( (user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    const user = userRepo.getUser(id);

    user !== undefined ? done(null, user) :
      done(null, false)
  });

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/api', routes);
};