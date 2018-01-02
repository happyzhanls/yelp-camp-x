var express = require("express"),
    router = express.Router(),
    passport = require("passport");

var User = require("../models/user");

// root route
router.get("/", function(req, res) {
    res.render("landing");
});

// ============================================= //
// ================= Auth =================== //
// ============================================= //

// Show sign up form
router.get("/signUp", function(req, res) {
    res.render("signUp");
});

// handle user register
router.post("/signUp", function(req, res) {
    var newUser = new User({username: req.body.username});
    var newPass = req.body.password;
    User.register(newUser, newPass, function(err, user) {
        if(err) {
            console.log(err);
            return res.redirect("/signUp");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds");
        });
    });
});

// show login form
router.get("/logIn", function(req, res) {
    res.render("logIn");
});

// handle user login
router.post("/logIn", passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/logIn"
    }), function(req, res) {
});

// logout route
router.get("/logOut", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

module.exports = router;