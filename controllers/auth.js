var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

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

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  successFlash: 'You are now logged in',
  failureRedirect: '/auth/login'
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
