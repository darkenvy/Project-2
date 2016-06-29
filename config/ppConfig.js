var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.user.findById(id)
  .then(function(user) {
    cb(null, user);
  }).catch(cb);
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, cb) {
  db.user.find({
    where: { email: email }
  }).then(function(user) {
    if (user && user.validPassword(password)) {
      cb(null, user);
    } else {
      cb(null, false);
    }
  }).catch(cb);
}));

// Working on getting passport-slack to work below

// passport.use(new SlackStrategy({
//     clientID: CLIENT_ID,
//     clientSecret: CLIENT_SECRET
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ SlackId: profile.id }, function(err, user) {
//       return done(err, user);
//     });
//   }
// ));

module.exports = passport;
