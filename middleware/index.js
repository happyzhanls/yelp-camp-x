var Campground = require("../models/campground"),
    Comment = require("../models/comment");

// all the middlewares are here!
var middlewareObj = {};

middlewareObj.checkCampgroundUser = function (req, res, next) {
  Campground.findById(req.params.id, function (err, foundCampground){
    if (err || !foundCampground) {
      req.flash("failure", "Sorry, that campground does NOT exist!");
      res.redirect("/campgrounds");
    } else if (foundCampground.author.id.equals(req.user._id)) {
      req.campground = foundCampground;
      next();
    } else {
      req.flash("failure", "Sorry, you don't have permission to do that!");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
};

middlewareObj.checkCommentUser = function (req, res, next) {
  Comment.findById(req.params.comment_id, function (err, foundComment){
    if (err || !foundComment) {
      req.flash("failure", "Sorry, that comment does NOT exist!");
      res.redirect("/campgrounds/" + req.params.id);
    } else if (foundComment.author.id.equals(req.user._id)) {
      req.comment = foundComment;
      next();
    } else {
      req.flash("failure", "Sorry, you don't have permission to do that!");
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
};

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.session.redirectTo = req.originalUrl;
    req.flash("failure", "Sorry, you must be logged in to do that!");
    res.redirect("/logIn");
  }
};

module.exports = middlewareObj; 