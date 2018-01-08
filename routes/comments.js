var express = require("express"),
    router = express.Router({mergeParams: true});
    
var Campground = require("../models/campground"),
    Comment = require("../models/comment");
    
var middleware = require("../middleware");

// COMMENTS CREATE
router.post("/", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCg) {
        if(err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, createdCm) {
                if(err) {
                    console.log(err);
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
router.get("/:comment_id/edit", middleware.checkCommentUser, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {
                campground_id: req.params.id,
                comment: foundComment
            });
        }
    });
});

// COMMENTS UPDATE
router.put("/:comment_id", middleware.checkCommentUser, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// COMMENTS DESTROY
router.delete("/:comment_id", middleware.checkCommentUser, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;