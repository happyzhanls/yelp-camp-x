var express = require("express"),
    router = express.Router();
    
var Campground = require("../models/campground");
var middleware = require("../middleware");
var geocoder = require("geocoder");

// configure multer
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter});

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'learntocodeinfo', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// CAMPGROUNDS INDEX
router.get("/", function (req, res) {
  // Get all cgs from DB
  Campground.find({}, function (err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: campgrounds, page: 'campgrounds' });
    }
  });
});

// CAMPGROUNDS NEW
router.get("/new", middleware.isLoggedIn, function (req, res) {
  res.render("campgrounds/new");
});

// CAMPGROUNDS CREATE
router.post("/", middleware.isLoggedIn, upload.single('image'), function (req, res) {
  // gets data from form and add to a new campground 
  var name = req.body.name;
  var desc = req.body.description;
  // add author to campground
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  
  geocoder.geocode(req.body.location, function (err, data) {
    if (err) return console.log(err);
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    cloudinary.uploader.upload(req.file.path, function(result) {
      // add cloudinary url for the image to the campground object under image property
      var image = result.secure_url;
      // create a newCampground object
      var newCampground = {
        name: name, 
        image: image, 
        description: desc, 
        location: location,
        lat: lat,
        lng: lng,
        author: author
      };
      // add to the campground model
      Campground.create(newCampground, function(err, campground) {
        if (err) {
          req.flash('failure', err.message);
          return res.redirect('back');
        }
        res.redirect('/campgrounds/' + campground.id);
      });
    });
  });
});

// CAMPGROUNDS SHOW
router.get("/:id", function (req, res) {
  // find the campground with provided ID
  // populate the comments object inside the Campground
  Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
    if (err || !foundCampground) {
      req.flash("failure", "Sorry, that campground does NOT exist!");
      return res.redirect("/campgrounds");
    } else {
      // render show template page for specif ic ID
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// CAMPGROUNDS EDIT
router.get("/:id/edit", middleware.isLoggedIn, middleware.checkCampgroundUser, function (req, res) {
  res.render("campgrounds/edit", { campground: req.campground });
});

// CAMPGROUNDS UPDATE
router.put("/:id", middleware.isLoggedIn, middleware.checkCampgroundUser, function (req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
    if (err) {
      res.redirect("back");
    } else {
      req.flash("success", "The campground has been updated successfully!");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// CAMPGROUNDS DESTROY
router.delete("/:id", middleware.isLoggedIn, middleware.checkCampgroundUser, function (req, res) {
  Campground.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("back");
    } else {
      req.flash("success", "The campground has been deleted successfully!");
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;
