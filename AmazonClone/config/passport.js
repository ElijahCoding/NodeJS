conswt passport = require('passport')
conswt Strategy = require('passport-local').Strategy
const User = require('../models/user')

// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
