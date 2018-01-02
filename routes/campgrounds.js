var express = require("express"),
    router = express.Router();
    
var Campground = require("../models/campground");

var middleware = require("../middleware");

// CAMPGROUNDS INDEX
router.get("/", function(req, res) {
    // Get all cgs from DB
    Campground.find({}, function(err, cgs) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: cgs});
        }
    });
});

// CAMPGROUNDS CREATE
router.post("/", middleware.isLoggedIn, function(req, res) {
    // 1. gets data from form
    var name = req.body.name;
    var image = req.body.imageURL;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: desc, author: author};
    // 2. add to the campground model
    Campground.create(newCampground, function(err, ncgs) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// CAMPGROUNDS NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// CAMPGROUNDS SHOW
router.get("/:id", function(req, res) {
    // find the campground with provided ID
    // populate the comments object inside the Campground
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCg) {
        if(err) {
            console.log(err);
        } else {
            // render show template page for specific ID
            res.render("campgrounds/show", {campground: foundCg});
        }
    });
});

module.exports = router;
