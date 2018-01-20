var express = require("express"),
    router = express.Router({mergeParams: true});
    
var Campground = require("../models/campground"),
    Comment = require("../models/comment");
    
var middleware = require("../middleware");

// COMMENTS CREATE
router.post("/", middleware.isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function (err, foundCg) {
    if (err) {
      console.log(err);
    } else {
      Comment.create(req.body.comment, function (err, createdCm) {
        if (err) {
          return console.log(err);
        } else {
          // find the current username an add it to comment
          createdCm.author.id = req.user._id;
          createdCm.author.username = req.user.username;
          createdCm.save();
          foundCg.comments.push(createdCm._id);
          foundCg.save();
          res.redirect("/campgrounds/" + foundCg._id);
        }
      });
    }
  });
});

// COMMENTS EDIT
router.get("/:comment_id/edit", middleware.isLoggedIn, middleware.checkCommentUser, function (req, res) {
  res.render("comments/edit", {
    campground_id: req.params.id,
    comment: req.comment
  });
});

// COMMENTS UPDATE
router.put("/:comment_id", middleware.isLoggedIn, middleware.checkCommentUser, function (req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
    if (err) {
      res.redirect("back");
    } else {
      req.flash("success", "The comment has been updated successfully!");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// COMMENTS DESTROY
router.delete("/:comment_id", middleware.isLoggedIn, middleware.checkCommentUser, function (req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function (err) {
    if (err) {
      res.redirect("back");
    } else {
      req.flash("success", "The comment has been deleted successfully!");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

module.exports = router;