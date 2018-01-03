var Comment = require("./models/comment"),
    Campground = require("./models/campground"),
    User = require("./models/user");

function seedsInit() {
  Campground.remove({}, postRemoveCampground);
}

function postRemoveCampground (err) {
  if (err) return console.log(err);
  console.log("removed all campgrounds!");
  Comment.remove({}, postRemoveComment);
}

function postRemoveComment (err) {
  if (err) return console.log(err);
  console.log("removed all comments!");
  User.remove({}, postRemoveUser);
}

function postRemoveUser (err) {
  if (err) return console.log(err);
  console.log("removed all users!");
}

module.exports.init = seedsInit;