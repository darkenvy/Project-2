var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();

// Route to show search page, list upcoming events
router.get('/search', function(req, res) {
  res.render('event/search');
});

// Route to display specific search results
router.post('/search/:query', function(req, res) {

});

// Route to page for creating new event
router.get('/new', function(req, res) {
  res.render('event/create');
});

// Route for specific event page
router.get('/:id', function(req, res) {
  db.event.findById(req.params.id).then(function(event) {
    if (event) {
      res.render('event/show', { event: event });
    } else {
      res.status(404).render('error');
    }
  }).catch(function(err) {
    res.status(500).render('error')
  });
});

// Route for registering for a specific event
router.get('/:id/register', function(req, res) {
  db.event.findById(req.params.id).then(function(event) {
    if (event) {
      res.render('event/register', { event: event });
    } else {
      res.status(404).render('error');
    }
  }).catch(function(err) {
    res.status(500).render('error');
  });
});

// Route to specific event homepage for registered (authorized) users
// MAY NEED TO STILL ADD CODE TO VALIDATE AUTHORIZATION
router.get('/:id/home', function(req, res) {
  db.event.findById(req.params.id).then(function(event) {
    if (event) {
      res.render('event/home', { event: event });
    } else {
      res.status(404).render('error');
    }
  }).catch(function(err) {
    res.status(500).render('error');
  });
});

// Route for organizers to plan/edit their page
router.get('/:id/planning', function(req, res) {
  db.event.findById(req.params.id).then(function(event) {
    if (event) {
      res.render('event/planning', { event: event });
    } else {
      res.status(404).render('error');
    }
  }).catch(function(err) {
    res.status(500).render('error');
  });
});

module.exports = router;
