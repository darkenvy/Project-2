var db = require('../models');

module.exports = function(req, res, next) {
  var currentUserId = req.user.id;
  if (req.user) {
    db.usersEventsRoles.find({
      where: {
        usersId : currentUserId,
        eventsId : req.params.id,
        rolesId : 1
      }
    })
    .then(function(userEventRole) {
      if (userEventRole) {
        next();
      } else {
        req.flash('error', 'You\'re not authorized to view this.');
        res.redirect('/');
      }
    });
  } else {
    req.flash('error', 'You need to be logged-in to access this page');
    res.redirect('/');
  }
};
