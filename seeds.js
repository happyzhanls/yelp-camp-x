var Comment = require("./models/comment"),
    Campground = require("./models/campground");

function seedsInit() {
  // Campground.remove({}, postRemoveCampground);
}

function postRemoveCampground (err) {
  if (err) return console.log(err);
  console.log("removed all campgrounds!");
  Comment.remove({}, postRemoveComment);
}

function postRemoveComment (err) {
  if (err) return console.log(err);
  console.log("removed all comments!");
}

module.exports.init = seedsInit;