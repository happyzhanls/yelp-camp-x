var Campground = require("../models/campground"),
    Comment = require("../models/comment");

// all the middlewares are here!
var middlewareObj = {};

middlewareObj.checkCampgroundUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err) {
                res.redirect("back");
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    }
};

middlewareObj.checkCommentUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    }
};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/logIn");
};

module.exports = middlewareObj;