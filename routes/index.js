var express = require("express"),
    router = express.Router(),
    passport = require("passport");

var User = require("../models/user");

// root route
router.get("/", function (req, res) {
  res.render("landing");
});

// ============================================= //
// ================= Auth =================== //
// ============================================= //

// Show sign up form
router.get("/signUp", function (req, res) {
  res.render("signUp");
});

// handle user register
router.post("/signUp", function (req, res) {
  var newUser = new User({username: req.body.username});
  var newPass = req.body.password;
  User.register(newUser, newPass, function (err, user) {
    if (err) {
      req.flash("failure", err.message);
      return res.redirect("/signUp");
    }
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "You have signed up successfully!");
      res.redirect("/campgrounds");
    });
  });
});

// show login form
router.get("/logIn", function (req, res) {
  res.render("logIn");
});

// handle user login
router.post("/logIn", function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { 
      req.flash("failure", "Sorry, the username does not exist or you've entered the wrong password!");
      return res.redirect("/logIn");
    }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      var redirectTo = req.session.redirectTo ? req.session.redirectTo : "/campgrounds";
      delete req.session.redirectTo;
      redirectTo = redirectTo.replace("/comments", "");
      req.flash("success", "You have logged in successfully!");
      return res.redirect(redirectTo);
    });
  })(req, res, next);
});

// logout route
router.get("/logOut", function (req, res) {
  req.logout();
  req.flash("success", "You have logged out successfully, bye!");
  res.redirect("/campgrounds");
});

module.exports = router;