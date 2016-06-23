module.exports = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    req.flash('error', 'You need to be logged in to view this.');
    res.redirect('/auth/login');
  }
};
