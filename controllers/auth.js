var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();

// Route to signup page
router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

// Route post to sign-up a new user, add to database, and redirect home
router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if (created) {
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'User created. You are now logged in.'
      })(req, res);
    } else {
      console.log('User with that email already exists.');
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {
    console.log('Error occurred', error.message);
    req.flash('error', 'An error occurred - please try again!')
    res.redirect('/auth/signup');
  });
});

// Route to login page
router.get('/login', function(req, res) {
  res.render('auth/login');
});

// Route to post login info, redirect to homepage
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  successFlash: 'You are now logged in',
  failureRedirect: '/auth/login'
}));

// Call route to authenticate Slack using passport-slack
router.get('/slack', passport.authorize('slack'));

// Callback route to authenticate Slack using passport-slack
router.get('/slack/callback',
  passport.authorize('slack', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

// Route to logout
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
