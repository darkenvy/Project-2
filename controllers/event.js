var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var isLoggedIn = require('../middleware/isLoggedIn');
var isOrganizer = require('../middleware/isOrganizer');
var isRegistered = require('../middleware/isRegistered');
var marked = require('marked');
var router = express.Router();

// Route to show page to search through events
router.get('/search', function(req, res) {
  res.render('event/search');
});

// Route to display upcoming events
router.get('/upcoming', function(req, res) {
  var date = new Date();
  db.event.findAll({
    where: {
      date: {
        $gt: new Date()
      }
    }
  })
  .then(function(event) {
    res.render('event/upcoming', { events: event })
  })
  .catch(function(err) {
    res.status(500).render('error');
  });
});

// Route to display specific search results
router.post('/search/:query', function(req, res) {

});

// Route to page for creating new event
router.get('/new', function(req, res) {
  res.render('event/create');
});

// Route to POST new event
router.post('/create', isLoggedIn, function(req, res) {
  console.log(req.user.id);
  db.event.findOrCreate({
    where: {
      name: req.body.eventName,
      date: req.body.eventDate,
      location: req.body.eventLocation
    },
    defaults: {
      venuename: req.body.venueName,
      description: req.body.eventDescription,
      venueaddress: req.body.venueAddress,
      venueurl: req.body.venueUrl
    }
  })
  .spread(function(event) {
    db.usersEventsRoles.create({
      eventsId: event.id,
      rolesId: 1,
      usersId: req.user.id
    }).then(function() {
      req.flash('success', 'Event successfully created!');
      res.redirect('/event/' + event.id + '/planning');
    });
  })
  .catch(function(err) {
    res.status(404).render('error');
  });
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

// Route for displaying register page for a specific event
router.get('/:id/register', isLoggedIn, function(req, res) {
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

// Route for registering for event
router.post('/:id/register', isLoggedIn, function(req, res) {
  db.event.findOne({
    where: { id: req.params.id },
    // include: [db.user, db.role]
  }).then(function(event) {
    // event.addUser(req.user.id, {
    //   rolesId: parseInt(req.body.roleSelect)
    // }).then(function() {
    //   res.redirect('/event/' + event.id + '/home');
    // });
    db.usersEventsRoles.create({
      eventsId: event.id,
      rolesId: parseInt(req.body.roleSelect),
      usersId: req.user.id
    }).then(function() {
      res.redirect('/event/' + event.id + '/home');
    });
  });
});

// Route to specific event homepage for registered (authorized) users
router.get('/:id/home', isRegistered, function(req, res) {
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
router.get('/:id/planning', isOrganizer, function(req, res) {
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

// Route for organizers to edit their event's Wiki
router.post('/:id/planning', isOrganizer, function(req, res) {
  console.log('wikiContent: ', req.body.wikiContent);
  console.log('wikiPublished: ', req.body.publish);
  if (!req.body.publish) {
    var publish = false;
  } else {
    var publish = true;
  }
  db.event.update({
    wikiContent: req.body.wikiContent,
    wikiPublished: publish
  }, {
    where: {
      id: req.params.id
    }
  }).then(function(event) {
    res.redirect('/event/' + req.params.id + '/home');
  });
});

module.exports = router;
