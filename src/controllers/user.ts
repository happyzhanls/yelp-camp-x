
import { Request, Response } from 'express';
import { check, sanitize, validationResult } from 'express-validator';

/**
 * GET /signup
 * Signup page.
 */
export const getSignup = (req: Request, res: Response) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("signUp");
};

export const postSignup = async (req: Request, res: Response) => {
  await check('email', 'Email is not valid').isEmail().run(req);
  await check('password')
}


// ============================================= //
// ================= Auth =================== //
// ============================================= //

// handle user register
// router.post("/signUp", function (req, res) {
//   var newUser = new User({username: req.body.username});
//   var newPass = req.body.password;
//   User.register(newUser, newPass, function (err, user) {
//     if (err) {
//       req.flash("failure", err.message);
//       return res.redirect("/signUp");
//     }
//     passport.authenticate("local")(req, res, function () {
//       req.flash("success", "You have signed up successfully!");
//       res.redirect("/campgrounds");
//     });
//   });
// });

// // show login form
// router.get("/logIn", function (req, res) {
//   res.render("logIn");
// });

// // handle user login
// router.post("/logIn", function (req, res, next) {
//   passport.authenticate('local', function (err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { 
//       req.flash("failure", "Sorry, the username does not exist or you've entered the wrong password!");
//       return res.redirect("/logIn");
//     }
//     req.logIn(user, function (err) {
//       if (err) { return next(err); }
//       var redirectTo = req.session.redirectTo ? req.session.redirectTo : "/campgrounds";
//       delete req.session.redirectTo;
//       redirectTo = redirectTo.replace("/comments", "");
//       req.flash("success", "You have logged in successfully!");
//       return res.redirect(redirectTo);
//     });
//   })(req, res, next);
// });

// // logout route
// router.get("/logOut", function (req, res) {
//   req.logout();
//   req.flash("success", "You have logged out successfully, bye!");
//   res.redirect("/campgrounds");
// });