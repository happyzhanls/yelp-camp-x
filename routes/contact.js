var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
var request = require("request");

// contact form
router.get("/", function(req, res) {
   res.render("contact/contactMe", {page: 'contact'});
});

router.post("/send", function(req, res) {
    const captcha = req.body["g-recaptcha-response"];
    if (!captcha) {
      req.flash("failure", "Please select captcha");
      return res.redirect("back");
    }
    // secret key
    var secretKey = process.env.CAPTCHA;
    // Verify URL
    var verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}&remoteip=${req.connection.remoteAddress}`;
    // Make request to Verify URL
    request.get(verifyURL, function(err, response, body) {
      if (err) return console.log(err);
      // if not successful
      if (body.success !== undefined && !body.success) {
        req.flash("failure", "Captcha Failed");
        return res.redirect("/contact");
      }
      var smtpTransport = nodemailer.createTransport({
          service: 'Gmail', 
          auth: {
            user: 'happyzhanls@gmail.com',
            pass: process.env.GMAILPW
          }
      });
      
      var mailOptions = {
          from: 'happyzhanls@gmail.com',
          to: 'happyzhanls@gmail.com',
          replyTo: req.body.email,
          subject: "Let's Camp contact request from: " + req.body.name,
          text: 'You have received an email from... Name: '+ req.body.name + ' Email: ' + req.body.email + ' Message: ' + req.body.message,
          html: '<h3>You have received an email from...</h3><ul><li>Name: ' + req.body.name + ' </li><li>Email: ' + req.body.email + ' </li></ul><p>Message: <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + req.body.message + ' </p>'
      };
      
      smtpTransport.sendMail(mailOptions, function(err, info){
        if(err) {
          console.log(err);
          req.flash("failure", "Something went wrong... Please try again later!");
          res.redirect("/contact");
        } else {
          req.flash("success", "Your email has been sent, I will respond within 24 hours.");
          res.redirect("/campgrounds");
        }
      });
    });
});

module.exports = router;