var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var SlackStrategy = require('passport-slack').Strategy;
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

passport.use(new SlackStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.BASE_URL + '/auth/slack/callback',
    scope: 'incoming-webhook users:read',
    extendedUserProfile: true
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken)
    var profileDetails = profile._json.info.user.profile;
    var email = profileDetails.email;
    db.user.find({
      where: { email: email },
    })
    .then(function(existingUser) {
      console.log(existingUser);
      if (existingUser && email) {
        existingUser.update({
          slackId: profile.id,
          slackToken: accessToken
        }).then(function(updatedUser) {
          cb(null, existingUser);
        }).catch(cb);
      } else {
        db.user.findOrCreate({
          where: { slackId: profile.id },
          defaults: {
            slackToken: accessToken,
            name: profileDetails.first_name,
            email: email,
            // password: 'testpass'
          }
        }).spread(function(user, created) {
          if (created) {
            return cb(null, user);
          } else {
            user.slackToken = accessToken;
            user.save().then(function() {
              cb(null, user);
            }).catch(cb);
          }
        }).catch(cb);
      }
    }).catch(cb);
  }
));

module.exports = passport;
